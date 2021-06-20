<template>
  <div>
    <b-modal
      id="add-input-ndi"
      title="Add NDI input"
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

      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "AddInputNdiModal",
    components: {},
    props: {},
    data() {
      return {
        name: ''
      };
    },
    methods: {
      resetModal() {
        this.name = '';
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
          //Add the NDI to the store and configure it
          this.$store.dispatch('inputNdi/add', this.name);

          //Hide the modal
          this.$nextTick(() => {
            this.$bvModal.hide("add-input-ndi");
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