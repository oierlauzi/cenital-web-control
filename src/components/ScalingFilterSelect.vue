<template>
  <div>
    <b-form-select :value="value" :options="options" @input="onInput" />
  </div>
</template>

<script>
  export default {
    name: "ScalingFilterSelect",
    components: {},
    props: {
      value: { type: String, default: "nearest" },
    },
    data() {
      return {};
    },
    methods: {
      onInput(value) {
        this.$emit("input", value);
      }
    },
    computed: {
      options() {
        return [
          { value: "nearest", text: "Nearest" },
          { value: "linear",  text: "Linear" },
          { value: "cubic",   text: "Cubic" },
        ];
      }
    }
  };
</script>