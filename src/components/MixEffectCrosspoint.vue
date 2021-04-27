<template>
  <div>
    <b-container fluid="sm" class="text-center">
      <!-- Signals -->
      <b-row class="my-3" align-v="center" :cols="columns + 2">
        <b-col cols="2">
          <b-button variant="outline-warning" :pressed.sync="shift">Shift</b-button>
        </b-col>
        <b-col v-for="(name, index) in layer" :key="'name'+index" cols="1">
          {{ name }}  
        </b-col>
      </b-row>

      <!-- Program row -->
      <b-row class="my-3" align-v="center" :cols="columns + 2">
        <b-col cols="2">
          <h3><b-badge variant="danger">PGM</b-badge></h3>
        </b-col>
        <b-col v-for="(name, index) in layer" :key="'pgm'+index" cols="1">
          <b-button
            variant="outline-danger" 
            size="lg" 
            :pressed="index + shift*columns === pgm"
            @click="pgmClick(index)"
          >
            <p/>
          </b-button>
        </b-col>
      </b-row>

      <!-- Preview row -->
      <b-row class="my-3" align-v="center" :cols="columns + 2">
        <b-col cols="2">
          <h3><b-badge variant="success">PVW</b-badge></h3>
        </b-col>
        <b-col v-for="(name, index) in layer" :key="'pvw'+index" cols="1">
          <b-button
            variant="outline-success" 
            size="lg" 
            :pressed="index + shift*columns === pvw"
            @click="pvwClick(index)"
          >
            <p/>
          </b-button>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "MixEffectCrosspoint",
    components: {},
    props: {
      mixEffect: { type: String, required: true },
      columns: { type: Number, default: 8 }
    },
    data() {
      return {
        shift: false
      };
    },
    methods: {
      pgmClick: function(idx) {
        //Calculate the next index
        idx += this.shift*this.columns; //Applies the shift
        if(this.pgm === idx) {
          //Already in PGM. Uncheck
          idx = -1;
        }

        this.$store.dispatch("mixEffect/setProgram", { name: this.mixEffect, index: idx });
      },
      pvwClick: function(idx) {
        //Calculate the next index
        idx += this.shift*this.columns; //Applies the shift
        if(this.pvw === idx) {
          //Already in PVW. Uncheck
          idx = -1;
        }

        this.$store.dispatch("mixEffect/setPreview", { name: this.mixEffect, index: idx });
      }

    },
    computed: {
      ...mapGetters("mixEffect", [ 
        "getInputs",
        "getProgram",
        "getPreview"
      ]),


      signals() {
        return this.getInputs(this.mixEffect);
      },
      pgm() {
        return this.getProgram(this.mixEffect);
      },
      pvw() {
        return this.getPreview(this.mixEffect);
      },
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