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
      <!-- Signals -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <b-button variant="outline-warning" :pressed.sync="shift">Shift</b-button>
        </b-col>

        <b-col v-for="(name, index) in layer" :key="'name'+index">
          <b-dropdown 
            variant="outline-dark"
            block
            menu-class="w-100"
          >
            <template #button-content>
              <div class="dropdown-btn-multiline">
                {{ name ? name : 'None' }}
              </div>
            </template>

            <b-dropdown-item>None</b-dropdown-item>
            <b-dropdown-divider />

            <!-- TODO add available signals -->

          </b-dropdown>

           
        </b-col>
      </b-row>

      <!-- Program row -->
      <b-row class="my-3" align-v="center" :cols="columns + 1">
        <b-col>
          <h3><b-badge variant="danger">PGM</b-badge></h3>
        </b-col>

        <b-col v-for="(name, index) in layer" :key="'pgm'+index">
          <b-button
            block
            class="w-100"
            variant="outline-danger" 
            :pressed="index + shift*columns === pgm"
            @click="pgmClick(index)"
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

        <b-col v-for="(name, index) in layer" :key="'pvw'+index">
          <b-button
            block
            class="w-100"
            variant="outline-success" 
            :pressed="index + shift*columns === pvw"
            @click="pvwClick(index)"
          >
            <div class="crosspoint-btn" />
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

      pgm() {
        return this.getProgram(this.mixEffect);
      },
      pvw() {
        return this.getPreview(this.mixEffect);
      },
      layer() {
        var result = [];

        if(!this.shift) {
          result = this.getInputs(this.mixEffect).slice(0*this.columns, 1*this.columns);
        } else {
          result = this.getInputs(this.mixEffect).slice(1*this.columns, 2*this.columns);
        }

        return result;
      }
    }
  };
</script>