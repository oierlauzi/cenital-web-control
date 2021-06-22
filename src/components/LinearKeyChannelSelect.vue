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
    name: "LinearKeyChannelSelect",
    components: {},
    props: {
      value: { type: String, default: "fillR" },
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
          { value: "fillR", text: "Fill R" },
          { value: "fillG", text: "Fill G" },
          { value: "fillB", text: "Fill B" },
          { value: "fillA", text: "Fill A" },
          { value: "fillY", text: "Fill Y" },
          { value: "keyR",  text: "Key R" },
          { value: "keyG",  text: "Key G" },
          { value: "keyB",  text: "Key B" },
          { value: "keyA",  text: "Key A" },
          { value: "keyY",  text: "Key Y" },
        ];
      }
    }
  };
</script>