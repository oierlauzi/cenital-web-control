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
    name: "TransitionEffectSelect",
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
          { value: "Mix", text: "Mix" },
          { value: "DVE", text: "DVE" },
        ];
      }
    }
  };
</script>