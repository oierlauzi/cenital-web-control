<template>
  <div>
    <b-container fluid>
      <!-- Contents -->
      <b-row align-h="start" align-v="start">
        <!-- Cross-point -->
        <b-col cols="6">
          <MixEffectCrosspoint :key="name" :name="name" :columns="8" />
        </b-col>

        <!-- Transition area -->
        <b-col cols="3">
          <MixEffectTransition :key="name" :name="name" />
        </b-col>


        <!-- Configuration -->
        <b-col cols="3">
          <div :key="name" class="accordion" role="tablist">
            <!-- Settings -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-settings'" variant="primary">Settings</b-button>
              </b-card-header>
              <b-collapse id="accordion-settings" visible accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectSettings :name="name" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Transitions -->
            <b-card v-for="effect in transitionEffects" :key="'transition'+effect"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'transition-effect-' + effect" variant="warning">{{effect}} transition</b-button>
              </b-card-header>
              <b-collapse :id="'transition-effect-' + effect" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectTransitionEffect :name="name" :effect="effect" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Up Stream overlays -->
            <b-card v-for="index in uskCount" :key="'usk'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-usk' + index" variant="secondary">Upstream overlay {{index}}</b-button>
              </b-card-header>
              <b-collapse :id="'accordion-usk' + index" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectKeyer :mixEffect="name" :num="index-1" type="usk" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Down Stream overlays -->
            <b-card v-for="index in dskCount" :key="'dsk'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-dsk' + index" variant="dark">Downstream overlay {{index}}</b-button>
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
  import { mapGetters } from 'vuex'

  import MixEffectCrosspoint from "../components/MixEffectCrosspoint"
  import MixEffectTransition from "../components/MixEffectTransition"
  import MixEffectSettings from "../components/MixEffectSettings"
  import MixEffectTransitionEffect from "../components/MixEffectTransitionEffect"
  import MixEffectKeyer from "../components/MixEffectKeyer"

  export default {
    name: 'MixEffectControl',
    components: {
      MixEffectCrosspoint,
      MixEffectTransition,
      MixEffectSettings,
      MixEffectTransitionEffect,
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
      ...mapGetters("mixEffect", [ 
        'getTransitionEffects',
        'getUpstreamOverlayCount',
        'getDownstreamOverlayCount',
      ]),


      transitionEffects() {
        return this.getTransitionEffects(this.name);
      },
      uskCount() {
        return this.getUpstreamOverlayCount(this.name);
      },
      dskCount() {
        return this.getDownstreamOverlayCount(this.name);
      }
    }
  }
</script>