<template>
  <div>
    <b-modal
      id="add-output-window"
      title="Add output window"
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

        <!-- Size -->
        <b-form-group
          label="Size"
          label-for="size-input"
        >
          <VectorInput
            ref="size-input"
            v-model="size"
          />
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
  import VectorInput from './VectorInput'

  export default {
    name: "AddOutputWindowModal",
    components: {
      VectorInput
    },
    props: {},
    data() {
      return {
        name: '',
        size: [640, 480]
      };
    },
    methods: {
      resetModal() {
        this.name = '';
        this.title = '';
        //Do not reset the size, it might be useful for next calls
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
          this.$store.dispatch('outputWindow/add', { name: this.name, size: this.size });

          //Hide the modal
          this.$nextTick(() => {
            this.$bvModal.hide("add-output-window");
          });
        }




      }
    },
    computed: {
      inputNameValidation() {
        return  this.name !== '' && 
                !this.$store.getters['mixer/getElements'].includes(this.name) ;
      }
    }
  };
</script>