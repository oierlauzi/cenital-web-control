<template>
  <div>
    <b-form-input 
      type="text"
      placeholder="width x height"
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

  function defaultResolution()  { 
    return { width: 0, height: 0 }; 
  }

  export default {
    name: "ResolutionInput",
    components: {},
    props: {
      value: { type: Object, default: defaultResolution },
      disabled: { type: Boolean, default: false },
    },
    data() {
      return {
        state: null,
      };
    },
    methods: {
      onInput(value) {
        const resolution = cenitalCli.parseResolution(value);
        this.state = resolution ? null : false;
        this.$emit("input", resolution);
      },
      onChange(value) {
        const resolution = cenitalCli.parseResolution(value);
        this.$emit("change", resolution);
      }
    },
    computed: {
      text() {
        return cenitalCli.generateResolution(this.value);
      }
    }
  };
</script>