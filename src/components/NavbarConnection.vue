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
        :variant="getConnection ? 'success' : 'danger'"
        @click="connect"
      >
        Connect
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
        url: ""
      };
    },
    methods: {
      connect() {
        //Get the url if valid
        var url = this.$refs['input-url'].checkValidity() ? this.url : "";

        //Set the url on the store
        this.$store.dispatch('webSocket/setURL', url);
      }
    },
    computed: {
      ...mapGetters('webSocket', ['getConnection'])
    }
  }
</script>