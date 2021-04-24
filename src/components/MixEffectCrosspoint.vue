<template>
  <div>
    <b-container fluid="sm" class="text-center">
      <!-- Signals -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col cols="1">
          <b-button variant="outline-warning" :pressed.sync="shift">Shift</b-button>
        </b-col>
        <b-col v-for="(name, index) in layer" :key="index" cols="1">
          {{ name }}  
        </b-col>
      </b-row>

      <!-- Preview row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col cols="1">
          <h3><b-badge variant="success">PVW</b-badge></h3>
        </b-col>
        <b-col v-for="(name, index) in layer" :key="index" cols="1">
          <b-form-radio 
            button 
            button-variant="outline-success" 
            size="lg" 
            :value="index + shift*columns" 
            v-model="pvw"
          >
            <p/>
          </b-form-radio>
        </b-col>
      </b-row>

      <!-- Program row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col cols="1">
          <h3><b-badge variant="danger">PGM</b-badge></h3>
        </b-col>
        <b-col v-for="(name, index) in layer" :key="index" cols="1">
          <b-form-radio 
            button 
            button-variant="outline-danger" 
            size="lg" 
            :value="index + shift*columns" 
            v-model="pgm"
          >
            <p/>
          </b-form-radio>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  export default {
    name: "MixEffectCrosspoint",
    components: {},
    props: {
      signals: { type: Array, required: true },
      columns: { type: Number, default: 8 },
      pgm: { type: Number, default: -1 },
      pvw: { type: Number, default: -1 }
    },
    data() {
      return {
        shift: false
      };
    },
    methods: {

    },
    computed: {
      layer() {
        var result = [];

        if(!this.shift) {
          result = this.signals.slice(0*this.columns, 1*this.columns);
        } else {
          result = this.signals.slice(1*this.columns, 2*this.columns);
        }

        return result;
      }
    }
  };
</script>