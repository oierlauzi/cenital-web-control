<template>
  <div>
    <b-form-input 
      type="text"
      placeholder="width x height"
      :state="state"
      :value="text"
      @input="onInput" 
    />
  </div>
</template>

<script>
  function defaultRational()  { 
    return { width: 0, height: 0 }; 
  }

  export default {
    name: "ResolutionInput",
    components: {},
    props: {
      value: { type: Object, default: defaultRational },
    },
    data() {
      return {
        state: null,
      };
    },
    methods: {
      onInput(value) {
        //Slipt the string in two parts
        const halves = value.split('x');

        if(halves.length !== 2) {
          this.state = false;
        }  else {
          //Parse the width and height
          const width = parseInt(halves[0], 10);
          const height = parseInt(halves[1], 10);

          if(!isNaN(width) && !isNaN(height)) {
            //OK!
            this.state = null;
            this.$emit("input", { width, height });
          } else {
            this.state = false;
          }
        }
      }
    },
    computed: {
      text() {
        return this.value.width + 'x' + this.value.height;
      }
    }
  };
</script>