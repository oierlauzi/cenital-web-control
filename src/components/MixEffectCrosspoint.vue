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
    <b-container fluid>
      <!-- Aux row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="warning">AUX</b-badge></h3>
        </b-col>

        <b-col v-for="(signal, index) in signals" :key="'aux'+index">
          <b-button
            block
            class="w-100"
            variant="outline-warning" 
            :pressed="calcIndex(index) === aux"
            @click="auxClick(calcIndex(index))"
          >
            <div class="crosspoint-btn" />
          </b-button>
        </b-col>

        <b-col v-for="index in padding" :key="'auxPadding'+index" />
      </b-row>

      <!-- Signals -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <b-button variant="outline-warning" :pressed.sync="shift">Shift</b-button>
        </b-col>

        <b-col v-for="(signal, index) in signals" :key="'name'+index">
          <SourceSelect :name="name" :input="signal"/>
        </b-col>

        <b-col v-for="index in padding" :key="'namePadding'+index" />
      </b-row>

      <!-- Program row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="danger">PGM</b-badge></h3>
        </b-col>

        <b-col v-for="(signal, index) in signals" :key="'pgm'+index">
          <b-button
            block
            class="w-100"
            variant="outline-danger" 
            :pressed="calcIndex(index) === pgm"
            @click="pgmClick(calcIndex(index))"
          >
            <div class="crosspoint-btn" />
          </b-button>
        </b-col>

        <b-col v-for="index in padding" :key="'pgmPadding'+index" />
      </b-row>

      <!-- Preview row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="success">PVW</b-badge></h3>
        </b-col>

        <b-col v-for="(signal, index) in signals" :key="'pvw'+index">
          <b-button
            block
            class="w-100"
            variant="outline-success" 
            :pressed="calcIndex(index) === pvw"
            @click="pvwClick(calcIndex(index))"
          >
            <div class="crosspoint-btn" />
          </b-button>
        </b-col>

        <b-col v-for="index in padding" :key="'pvwPadding'+index" />
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import SourceSelect from './SourceSelect'

  export default {
    name: 'MixEffectCrosspoint',
    components: {
      SourceSelect,
    },
    props: {
      name: { type: String, required: true },
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

        this.$store.dispatch('mixEffect/setProgram', { name: this.name, value: index });
      },

      pvwClick: function(index) {
        if(this.pvw === index) {
          //Already in PVW. Uncheck
          index = -1;
        }

        this.$store.dispatch('mixEffect/setPreview', { name: this.name, value: index });
      }

    },
    computed: {
      ...mapGetters("mixEffect", [ 
        "getProgram",
        "getPreview"
      ]),

      ...mapGetters("mixer", [ 
        "getElementInputs"
      ]),

      aux() {
        return 0; //TODO
      },
      pgm() {
        return this.getProgram(this.name);
      },
      pvw() {
        return this.getPreview(this.name);
      },

      signals() {
        const inputs = this.getElementInputs(this.name);
        const start = this.calcIndex(0);
        return inputs.slice(start, start + this.columns);
      },
      padding() {
        return this.columns - this.signals.length;
      }
    }
  };
</script>