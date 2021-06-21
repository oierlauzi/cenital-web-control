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
    name: "BlendingModeSelect",
    components: {},
    props: {
      value: { type: String, default: "opacity" },
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
          { value: 'write',         text: 'Overwrite' },
          { value: 'opacity',       text: 'Opacity' },
          { value: 'add',           text: 'Add' },
          { value: 'differenceInv', text: 'Inverse difference' },
          { value: 'difference',    text: 'Difference' },
          { value: 'darken',        text: 'Darken' },
          { value: 'lighten',       text: 'Lighten' },
          { value: 'multiply',      text: 'Multiply' },
          { value: 'screen',        text: 'Screen' },
        ];
      }
    }
  };
</script>