<style scoped>
  .dropdown-btn-multiline {
    white-space:normal !important;
    word-wrap: break-word;
    text-align: center;
  }

  .crosspoint-btn {
    width: 100%;
    padding-bottom: 100%;
  }

</style>

<template>
  <div>
    <b-container fluid class="text-center">
      <!-- Aux row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="warning">AUX</b-badge></h3>
        </b-col>

        <b-col v-for="index in count" :key="'aux'+index">
          <b-button
            block
            class="w-100"
            variant="outline-warning" 
            :pressed="calcIndex(index-1) === aux"
            @click="auxClick(calcIndex(index-1))"
          >
            <div class="crosspoint-btn" />
          </b-button>
        </b-col>
      </b-row>

      <!-- Signals -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <b-button variant="outline-warning" :pressed.sync="shift">Shift</b-button>
        </b-col>

        <b-col v-for="index in count" :key="'name'+index">
          <SourceSelector :element="mixEffect" :input="'videoIn' + calcIndex(index-1)"/>
        </b-col>
      </b-row>

      <!-- Program row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="danger">PGM</b-badge></h3>
        </b-col>

        <b-col v-for="index in count" :key="'pgm'+index">
          <b-button
            block
            class="w-100"
            variant="outline-danger" 
            :pressed="calcIndex(index-1) === pgm"
            @click="pgmClick(calcIndex(index-1))"
          >
            <div class="crosspoint-btn" />
          </b-button>
        </b-col>
      </b-row>

      <!-- Preview row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="success">PVW</b-badge></h3>
        </b-col>

        <b-col v-for="index in count" :key="'pvw'+index">
          <b-button
            block
            class="w-100"
            variant="outline-success" 
            :pressed="calcIndex(index-1) === pvw"
            @click="pvwClick(calcIndex(index-1))"
          >
            <div class="crosspoint-btn" />
          </b-button>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import SourceSelector from './SourceSelector'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MixEffectCrosspoint',
    components: {
      SourceSelector,
    },
    props: {
      mixEffect: { type: String, required: true },
      auxCallback: { type: Function, default: null },
      columns: { type: Number, default: 8 }
    },
    data() {
      return {
        shift: false
      };
    },
    methods: {
      calcIndex: function(button) {
        //Account for the offset introduced by shift
        return button + this.shift*this.columns;
      },

      calcButton: function(idx) {
        //Account for the offset introduced by shift
        return idx - this.shift*this.columns;
      },


      //eslint-disable-next-line no-unused-vars
      auxClick: function(index) {
        //TODO
      },
      
      pgmClick: function(index) {
        if(this.pgm === index) {
          //Already in PGM. Uncheck
          index = -1;
        }

        this.$store.dispatch('mixEffect/setProgram', { name: this.mixEffect, index: index });
      },

      pvwClick: function(index) {
        if(this.pvw === index) {
          //Already in PVW. Uncheck
          index = -1;
        }

        this.$store.dispatch('mixEffect/setPreview', { name: this.mixEffect, index: index });
      }

    },
    computed: {
      ...mapGetters("mixEffect", [ 
        "getInputCount",
        "getProgram",
        "getPreview"
      ]),

      aux() {
        return 0; //TODO
      },
      pgm() {
        return this.getProgram(this.mixEffect);
      },
      pvw() {
        return this.getPreview(this.mixEffect);
      },

      count() {
        return Math.max(Math.min(this.columns, this.getInputCount(this.mixEffect) - this.calcIndex(0)), 0);
      }
    }
  };
</script>