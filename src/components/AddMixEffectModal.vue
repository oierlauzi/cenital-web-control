<template>
  <div>
    <b-modal
      id="add-mix-effect"
      title="Add Mix Effect"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Name -->
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="inputNameValidation"
        >
          <b-form-input
            ref="name-input"
            v-model="name"
            :state="inputNameValidation"
            required
          />
        </b-form-group>

        <!-- Resolution -->
        <b-form-group
          label="Resolution"
          label-for="resolution-input"
        >
          <b-form-input
            ref="resolution-input"
            v-model="resolution"
            :state="resolutionValidation"
            required
          />
        </b-form-group>

        <!-- Input count -->
        <b-form-group
          label="Input count"
          label-for="input-count-input"
        >
          <b-form-spinbutton 
            ref="input-count-input" 
            v-model="inputCount"
            min="0"
            inline
          />
        </b-form-group>

        <!-- Upstream keyer count -->
        <b-form-group
          label="Upstream Keyer count"
          label-for="usk-count-input"
        >
          <b-form-spinbutton 
            ref="usk-count-input" 
            v-model="usOverlayCount"
            min="0"
            inline
          />
        </b-form-group>

        <!-- Downstream keyer count -->
        <b-form-group
          label="Downstream Keyer count"
          label-for="dsk-count-input"
        >
          <b-form-spinbutton 
            ref="dsk-count-input" 
            v-model="dsOverlayCount"
            min="0"
            inline
          />
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
  import cenitalCli from '../api/cenitalCli'

  export default {
    name: "AddMixEffectModal",
    components: {},
    props: {},
    data() {
      return {
        name: '',
        resolution: '1920x1080',
        inputCount: 8,
        usOverlayCount: 4,
        dsOverlayCount: 2
      };
    },
    methods: {
      resetModal() {
        this.name = '';
        //Do not reset counts, as they may be useful for future calls
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
          //Add the mix effect to the store and configure it
          this.$store.dispatch('mixEffect/add', this.name)
          .then(() => {
            //Configure in parallel
            return Promise.all([
              this.$store.dispatch('mixer/setResolution', { name: this.name, value: cenitalCli.parseResolution(this.resolution) }),
              this.$store.dispatch('mixer/setPixelAspectRatio', { name: this.name, value: { num:1, den: 1 } }),
              this.$store.dispatch('mixEffect/setInputCount', { name: this.name, value: this.inputCount }),
              this.$store.dispatch('mixEffect/setOverlayCount', { name: this.name, slot: 'upstream', value: this.usOverlayCount }),
              this.$store.dispatch('mixEffect/setOverlayCount', { name: this.name, slot: 'downstream', value: this.dsOverlayCount }),
            ]);
          });

          //Hide the modal
          this.$nextTick(() => {
            this.$bvModal.hide("add-mix-effect");
          });
        }
      }
    },
    computed: {
      inputNameValidation() {
        return  this.name !== '' && 
                !this.$store.getters['mixer/getElements'].includes(this.name) ;
      },
      resolutionValidation() {
        return cenitalCli.parseResolution(this.resolution) != undefined;
      }
    }
  };
</script>