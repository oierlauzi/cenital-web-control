<template>
  <div>
    <b-container fluid class="text-center">
      <!-- Contents -->
      <b-row align-h="start" align-v="start">
        <!-- Cross-point -->
        <b-col cols="6">
          <MixEffectCrosspoint :key="name" :mixEffect="name" :columns="8" />
        </b-col>

        <!-- Transition area -->
        <b-col cols="2">
          <MixEffectTransition :key="name" :mixEffect="name" />
        </b-col>


        <!-- Configuration -->
        <b-col cols="4">
          <div :key="name" class="accordion" role="tablist">
            <!-- Settings -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-settings'" variant="secondary">Settings</b-button>
              </b-card-header>
              <b-collapse id="accordion-settings" visible accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectSettings :mixEffect="name" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Transition settings -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-transition'" variant="secondary">Transition</b-button>
              </b-card-header>
              <b-collapse id="accordion-transition" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectTransitionSettings :mixEffect="name" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Up Stream Keyers -->
            <b-card v-for="index in uskCount" :key="'usk'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-usk' + index" variant="primary">Up Stream Keyer {{index}}</b-button>
              </b-card-header>
              <b-collapse :id="'accordion-usk' + index" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectKeyer :mixEffect="name" :num="index-1" type="usk" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Down Stream Keyers -->
            <b-card v-for="index in dskCount" :key="'dsk'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-dsk' + index" variant="info">Down Stream Keyer {{index}}</b-button>
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
  import MixEffectTransitionSettings from "../components/MixEffectTransitionSettings"
  import MixEffectKeyer from "../components/MixEffectKeyer"

  export default {
    name: 'MixEffectControl',
    components: {
      MixEffectCrosspoint,
      MixEffectTransition,
      MixEffectSettings,
      MixEffectTransitionSettings,
      MixEffectKeyer
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {};
    },
    methods: {},
    computed: {
      uskCount() {
        //return this.$store.getters["mixEffect/"] //TODO
        return 4;
      },
      dskCount() {
        //return this.$store.getters["mixEffect/"] //TODO
        return 4;
      }
    }
  }
</script>