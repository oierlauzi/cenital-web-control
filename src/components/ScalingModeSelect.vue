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
    name: "ScalingModeSelect",
    components: {},
    props: {
      value: { type: String, default: "stretch" },
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
          { value: "stretch",           text: "Stretch" },
          { value: "box",               text: "Box" },
          { value: "crop",              text: "Crop" },
          { value: "clampVertically",   text: "Clamp vertically" },
          { value: "clampHorizontally", text: "Clamp horizontally" },
        ];
      }
    }
  };
</script>