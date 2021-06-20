<template>
  <div>
    <b-form-select 
      :value="value" 
      :options="options"
      :disabled="disabled"
      @input="onInput" 
      @change="onChange"
    />
  </div>
</template>

<script>
  export default {
    name: "ClipStateSelect",
    components: {},
    props: {
      value: { type: String, default: "paused" },
      disabled: { type: Boolean, default: false },
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
          { value: "paused",  text: "Paused" },
          { value: "playing", text: "Playing" },
        ];
      }
    }
  };
</script>