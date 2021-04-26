<template>
  <div>
    <b-container fluid class="text-center">
      <!-- Contents -->
      <b-row align-h="start" align-v="start">
        <!-- Cross-point -->
        <b-col>
          <MixEffectCrosspoint :columns="8" :signals="signals" :pgm="pgm" :pvw="pvw"/>
        </b-col>
        <b-col>
          <MixEffectTransition :mixEffect="name" />
        </b-col>


        <!-- Configuration -->
        <b-col>
          <div class="accordion" role="tablist">
            <!-- Settings -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-settings'" variant="primary">Settings</b-button>
              </b-card-header>
              <b-collapse id="accordion-settings" visible accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectSettings :mixEffect="name" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Up Stream Keyers -->
            <b-card v-for="index in 5" :key="'usk'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-usk' + index" variant="info">Up Stream Keyer {{index}}</b-button>
              </b-card-header>
              <b-collapse :id="'accordion-usk' + index" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectKeyer :mixEffect="name" :num="index-1" type="usk" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Down Stream Keyers -->
            <b-card v-for="index in 5" :key="'dsk'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-dsk' + index" variant="warning">Down Stream Keyer {{index}}</b-button>
              </b-card-header>
              <b-collapse :id="'accordion-dsk' + index" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectKeyer :mixEffect="name" :num="index-1" type="dsk" />
                </b-card-body>
              </b-collapse>
            </b-card>

          </div>
        </b-col>

      </b-row>


    </b-container>


  </div>
</template>

<script>
  import MixEffectCrosspoint from "../components/MixEffectCrosspoint"
  import MixEffectTransition from "../components/MixEffectTransition"
  import MixEffectSettings from "../components/MixEffectSettings"
  import MixEffectKeyer from "../components/MixEffectKeyer"

  export default {
    name: 'MixEffectControl',
    components: {
      MixEffectCrosspoint,
      MixEffectTransition,
      MixEffectSettings,
      MixEffectKeyer
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {};
    },
    methods: {

    },
    computed: {
      signals() {
        return this.$store.getters["mixEffect/getInputs"](this.name);
      },
      pgm() {
        return this.$store.getters["mixEffect/getProgram"](this.name);
      },
      pvw() {
        return this.$store.getters["mixEffect/getPreview"](this.name);
      }
    }
  }
</script>