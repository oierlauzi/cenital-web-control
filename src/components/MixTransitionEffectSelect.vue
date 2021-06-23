<template>
  <div>
    <b-form-select 
      :value="value" 
      :options="options" 
      @input="onInput" 
      @change="onChange"
    />
  </div>
</template>

<script>
  export default {
    name: "MixTransitionEffectSelect",
    components: {},
    props: {
      value: { type: String, default: "mix" },
    },
    data() {
      return {};
    },
    methods: {
      onInput(value) {
        this.$emit("input", value);
      },
      onChange(value) {
        this.$emit("change", value);
      },
    },
    computed: {
      options() {
        return [
          { value: "mix",   text: "Mix" },
          { value: "add",   text: "Add" },
          { value: "fade",  text: "Fade black" },
        ];
      }
    }
  };
</script>