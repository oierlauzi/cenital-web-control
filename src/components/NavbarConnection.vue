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
          :readonly="connected"
          :state="inputUrlState"
          @input="onInput"
        />
      </b-input-group>

      <b-button 
        :variant="error ? 'danger' : 'primary'"
        @click="onClick"
      >
        {{ connected ? "Disconnect" : "Connect" }}
      </b-button>

    </b-form>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "NavbarConnection",
    components: {},
    props: {},
    data() {
      return {
        url: "",
        urlValid: false,
      };
    },
    methods: {
      onClick() {
        if(this.connected) {
          //Disconnect
          this.$store.dispatch('connection/disconnect');
        } else if(this.urlValid) {
          //Connect only if the URL is valid
          this.$store.dispatch('connection/connect', this.url);
        }
      },
      onInput() {
        const inputUrl = this.$refs['input-url'];
        this.urlValid = inputUrl ? inputUrl.checkValidity() : false;
      }
    },
    computed: {
      ...mapGetters('connection', ['getConnected', 'getError']),

      connected() {
        return this.getConnected;
      },
      error() {
        return this.getError;
      },
      inputUrlState() {
        let result;

        if(this.connected) {
          result = true;
        } else {
          result = this.urlValid ? null : false;
        }

        return result;
      }
    }
  }
</script>