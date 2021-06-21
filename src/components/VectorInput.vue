<template>
  <div>
    <b-input-group>
      <template v-for="(component, index) in value">
        <!-- Tag -->
        <b-input-group-prepend is-text :key="'tag-' + index">
          {{componentName(index)}}
        </b-input-group-prepend>

        <!-- Compoent -->
        <b-form-input
            :key="'comp-' + index"
            :value="component"
            :disabled="disabled"
            @input="onInput(index, $event)"
            @change="onChange(index, $event)"
          />

      </template>
    </b-input-group>
  </div>
</template>

<script>
  function defaultValue() {
    return [0, 0, 0];
  }

  export default {
    name: "VectorInput",
    components: {},
    props: {
      value: { type: Array, default: defaultValue },
      disabled: { type: Boolean, default: false },
    },
    data() {
      return {};
    },
    methods: {
      componentName(index) {
        switch(index) {
        case 0:   return 'X';
        case 1:   return 'Y';
        case 2:   return 'Z';
        case 3:   return 'W';
        default:  return '';
        }
      },
      calcNewValue(index, value) {
        const result = this.value.slice();
        result[index] = value;
        return result;
      },

      onInput(index, value) {
        const result = this.calcNewValue(index, value);
        this.$emit("input", result);
      },
      onChange(index, value) {
        const result = this.calcNewValue(index, value);
        this.$emit("change", result);
      },

    },
    computed: {}
  };
</script>