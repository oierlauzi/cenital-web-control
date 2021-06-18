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
              @input="onInput(index, $event)"
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
    },
    data() {
      return {};
    },
    methods: {
      onInput(index, value) {
        const result = new Array(this.value);
        result[index] = value;
        this.$emit("input", result);
      },
      componentName(index) {
        switch(index) {
        case 0:   return 'X';
        case 1:   return 'Y';
        case 2:   return 'Z';
        case 3:   return 'W';
        default:  return '';
        }
      }
    },
    computed: {}
  };
</script>