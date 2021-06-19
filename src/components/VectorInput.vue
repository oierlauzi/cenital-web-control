<template>
  <div>
    <b-container fluid>
      <b-row class="my-1" :cols="4*this.value.length">

        <!-- Iterate over components -->
        <b-col sm="4" v-for="(component, index) in value" :key="index">
          <b-input-group 
            :prepend="componentName(index)" 
          >
            <b-form-input
              type="number"
              :value="component"
              :step="step"
              @input="onInput(index, $event)"
              @change="onChange(index, $event)"
            />
          </b-input-group>
        </b-col>
        
      </b-row>
    </b-container>



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
      step: { type: Number, default: 1 },
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