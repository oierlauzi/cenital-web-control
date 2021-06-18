<template>
  <div>
    <b-form-input 
      type="text"
      placeholder="num/den"
      :state="state"
      :value="text"
      @input="onInput" 
    />
  </div>
</template>

<script>
  function defaultRational()  { 
    return { num: 0, den: 1 }; 
  }

  export default {
    name: "RationalInput",
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
        const halves = value.split('/');

        if(halves.length !== 2) {
          this.state = false;
        }  else {
          //Parse the numerator and denominator
          const num = parseInt(halves[0], 10);
          const den = parseInt(halves[1], 10);

          if(!isNaN(num) && !isNaN(den)) {
            //OK!
            this.state = null;
            this.$emit("input", { num, den });
          } else {
            this.state = false;
          }
        }
      }
    },
    computed: {
      text() {
        return this.value.num + '/' + this.value.den;
      }
    }
  };
</script>