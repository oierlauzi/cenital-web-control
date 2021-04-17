<template>
  <div>
    <!-- Form -->
    <b-form inline ref="form">
      <label class="sr-only" for="input-url">Cenital URL</label>
      <b-input-group 
        prepend="URL" 
      >
        <b-form-input
          ref="input-url" 
          placeholder="ws://example.io/"
          type="url"
          v-model="url"
        />
      </b-input-group>

      <b-button 
        ref="button-connect" 
        :variant="connectionState ? 'success' : 'danger'"
        @click="connect"
      >
        Connect
      </b-button>

    </b-form>

  </div>
</template>

<script>
  export default {
    name: "Connection",
    components: {},
    props: {},
    data() {
      return {
        url: "",
        socket: null
      }
    },
    methods: {
      send(data) {
        if(this.socket) {
          this.socket.send(data);
        }
      },
      connect() {
        //Create a callback for opening the new 
        //conection when the old one is closed
        var self = this;
        var connectCallback = function() {
          self.socket = null;

          //Check if the url is valid
          if(self.url && self.$refs['input-url'].checkValidity()) {
            //Create the new connection
            self.socket = new WebSocket(self.url)

            //Configure the events
            self.socket.onopen = function() {
              //Emit the connection event
              self.$emit('connected')
            }
            self.socket.onmessage = function(event) {
              //Emit the event data
              self.$emit('recv', event.data)
            }
            self.socket.onclose = function() {
              //Set it as invalid
              self.socket = null

              //Show the error closed modal
              self.$bvModal.msgBoxOk("Connection closed with " + this.url)

              //Emit the disconnection event
              self.$emit('disconnected')
            }
          }
        }

        //Destroy the old connection
        if(this.socket) {
          this.socket.onclose = connectCallback;
          this.socket.close();
        } else {
          //Directly call the connect callback
          connectCallback()
        }

      }
    },
    computed: {
      connectionState() {
        return this.socket !== null
      }
    }
  }
</script>