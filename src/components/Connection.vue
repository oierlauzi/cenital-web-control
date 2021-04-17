<template>
  <div>
    <b-form inline>
      <label class="sr-only" for="input-url">Cenital URL</label>
      <b-input-group 
        prepend="URL" 
        class="mb-2 mr-sm-2 mb-sm-0"
        :state="state"
      >
        <b-form-input 
          id="input-url" 
          placeholder="Cenital URL"
          v-model="url"
          :state="state"
        />
      </b-input-group>

      <b-button 
        variant="primary"
        @click="handleConnect"
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
    props: {
      state: { type: Boolean },
      url: { type: String }
    },
    data() {
      return {}
    },
    methods: {
      handleConnect() {
        //Emit the connect event
        this.$emit("connect");
      }
    }
  }
</script>