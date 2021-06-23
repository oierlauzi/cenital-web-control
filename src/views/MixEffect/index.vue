<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>

    <!-- Contents -->
    <b-container fluid>
      <b-row align-h="start" align-v="start">
        <!-- Cross-point -->
        <b-col cols="6">
          <MixEffectCrosspoint 
            :key="name" 
            :name="name" 
            :columns="8" 
            :selectedOverlayFeed="selectedOverlayFeed" 
          />
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

            <!-- Mix transition -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'transition-effect-mix'" variant="warning">
                  Mix transition
                </b-button>
              </b-card-header>
              <b-collapse id="transition-effect-mix" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectTransitionMix :name="name" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- DVE transition -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'transition-effect-dve'" variant="warning">
                  DVE transition
                </b-button>
              </b-card-header>
              <b-collapse id="transition-effect-dve" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectTransitionDve :name="name" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Up Stream overlays -->
            <b-card v-for="index in uskCount" :key="'us-overlay'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-us-overlay' + index" variant="secondary">Upstream overlay {{index}}</b-button>
              </b-card-header>
              <b-collapse :id="'accordion-us-overlay' + index" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectOverlay 
                    :name="name" 
                    overlaySlot="upstream" 
                    :index="index-1"
                    :selectedOverlayFeed="selectedOverlayFeed"
                    @selectOverlayFeed="onSelectedOverlayFeed"
                  />
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Down Stream overlays -->
            <b-card v-for="index in dskCount" :key="'ds-overlay'+index"
              no-body class="mb-1"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-ds-overlay' + index" variant="dark">Downstream overlay {{index}}</b-button>
              </b-card-header>
              <b-collapse :id="'accordion-ds-overlay' + index" accordion="mix-effect-accordion" role="tabpanel">
                <b-card-body>
                  <MixEffectOverlay 
                    :name="name" 
                    overlaySlot="downstream" 
                    :index="index-1"
                    :selectedOverlayFeed="selectedOverlayFeed"
                    @selectOverlayFeed="onSelectedOverlayFeed"
                  />
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

  import MixEffectCrosspoint from "./MixEffectCrosspoint"
  import MixEffectTransition from "./MixEffectTransition"
  import MixEffectSettings from "./MixEffectSettings"
  import MixEffectTransitionMix from "./MixEffectTransitionMix"
  import MixEffectTransitionDve from "./MixEffectTransitionDve"
  import MixEffectOverlay from "./MixEffectOverlay"

  export default {
    name: 'MixEffect',
    components: {
      MixEffectCrosspoint,
      MixEffectTransition,
      MixEffectSettings,
      MixEffectTransitionMix,
      MixEffectTransitionDve,
      MixEffectOverlay
    },
    props: {},
    data() {
      return {
        selectedOverlayFeed: null
      };
    },
    methods: {
      onSelectedOverlayFeed(value) {
        this.selectedOverlayFeed = value;
      }
    },
    computed: {
      ...mapGetters("mixEffect", [ 
        'getOverlayCount',
      ]),

      name() {
        return this.$route.params.name;
      },

      uskCount() {
        return this.getOverlayCount(this.name, 'upstream');
      },
      dskCount() {
        return this.getOverlayCount(this.name, 'downstream');
      }
    }
  }
</script>