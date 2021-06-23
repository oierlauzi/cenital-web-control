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
    name: "DveTransitionEffectSelect",
    components: {},
    props: {
      value: { type: String, default: "uncover" },
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
          { value: "uncover",   text: "Uncover" },
          { value: "cover",     text: "Cover" },
          { value: "slide",     text: "Slide" },
          { value: "rotate3D",  text: "Rotate 3D" },
        ];
      }
    }
  };
</script>