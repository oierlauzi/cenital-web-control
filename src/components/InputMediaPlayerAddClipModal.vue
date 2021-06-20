<template>
  <div>
    <b-modal
      id="input-media-player-add-clip"
      title="Add clip"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Path -->
        <b-form-group
          label="Path"
          label-for="path-path"
          invalid-feedback="Path is required"
          :state="inputPathValidation"
        >
          <b-form-input
            ref="path-input"
            v-model="path"
            :state="inputPathValidation"
            required
          />
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "AddInputMediaPlayer",
    components: {},
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {
        path: ''
      };
    },
    methods: {
      resetModal() {
        this.path = '';
      },
      handleOk(event) {
        //Prevent modal from closing
        event.preventDefault();

        //Trigger submit handler
        this.handleSubmit();
      },
      handleSubmit() {
        //Return when the form isn't valid
        if(this.$refs.form.checkValidity()) {
          //Add the media player to the store and configure it
          this.$store.dispatch('inputMediaPlayer/addClip', { name: this.name, clip: this.path });

          //Hide the modal
          this.$nextTick(() => {
            this.$bvModal.hide("input-media-player-add-clip");
          });
        }
      }
    },
    computed: {
      inputPathValidation() {
        return  this.path !== '' && 
                !this.$store.getters['inputMediaPlayer/getClips'](this.name).includes(this.path) ;
      }
    }
  };
</script>