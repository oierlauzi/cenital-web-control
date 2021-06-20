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
    name: "ClipRepeatSelect",
    components: {},
    props: {
      value: { type: String, default: null },
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
          { value: null,      text: "No repeat" },
          { value: "repeat",  text: "Repeat" },
          { value: "pingPong",text: "Ping Pong" },
        ];
      }
    }
  };
</script>