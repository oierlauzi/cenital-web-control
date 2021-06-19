<template>
  <div>
    <b-form-input 
      type="text"
      placeholder="num/den"
      :state="state"
      :value="text"
      :disabled="disabled"
      @input="onInput" 
      @change="onChange"
    />
  </div>
</template>

<script>
  import cenitalCli from '../api/cenitalCli'

  function defaultRational()  { 
    return { num: 0, den: 1 }; 
  }

  export default {
    name: "RationalInput",
    components: {},
    props: {
      value: { type: Object, default: defaultRational },
      disabled: { type: Boolean, default: false },
    },
    data() {
      return {
        state: null,
      };
    },
    methods: {
      onInput(value) {
        const rational = cenitalCli.parseRational(value);
        this.state = rational ? null : false;
        this.$emit("input", rational);
      },
      onChange(value) {
        const rational = cenitalCli.parseRational(value);
        this.$emit("change", rational);
      }
    },
    computed: {
      text() {
        return cenitalCli.generateRational(this.value);
      }
    }
  };
</script>