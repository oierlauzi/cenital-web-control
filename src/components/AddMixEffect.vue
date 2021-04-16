<template>
  <div>
    <b-modal
      id="add-mix-effect"
      ref="modal"
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
            id="name-input"
            v-model="name"
            :state="inputNameValidation"
            required
          />
        </b-form-group>

        <!-- Input count -->
        <b-form-group
          label="Input count"
          label-for="input-count-input"
        >
          <b-form-spinbutton 
            id="input-count-input" 
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
            id="usk-count-input" 
            v-model="uskCount"
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
            id="dsk-count-input" 
            v-model="dskCount"
            min="0"
            inline
          />
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "AddMixEffect",
    components: {},
    props: {},
    data() {
      return {
        name: '',
        inputCount: 0,
        uskCount: 0,
        dskCount: 0,

        submittedNames: [] //TODO remove
      }
    },
    methods: {
      resetModal() {
        this.name = ''
        //this.nameState = null
        //Do not reset counts, as they may be useful for next calls
      },
      handleOk(bvModalEvt) {
        //Prevent modal from closing
        bvModalEvt.preventDefault()
        //Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        //Return when the form isn't valid
        if(!this.$refs.form.checkValidity()) {
          return
        }

        //Add the mix effect
        //TODO

        //Hide the modal
        this.$nextTick(() => {
          this.$bvModal.hide("add-mix-effect")
        })
      }
    },
    computed: {
      inputNameValidation() {
        return this.name != "" //TODO check if name already exists
      }
    }
  }
</script>