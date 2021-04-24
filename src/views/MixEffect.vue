<template>
  <div>
    <b-container fluid class="text-center">
      <!-- Title -->
      <b-row class="px-3 py-2" align-h="center" align-v="center">
        <b-col>
          <h1> {{ $route.params.name }} </h1>
        </b-col>
      </b-row>

      <!-- Contents -->
      <b-row align-h="left" align-v="top">
        <!-- Cross-point -->
        <b-col>
          <MixEffectCrosspoint :columns="8" :signals="signals" :pgm="pgm" :pvw="pvw"/>
        </b-col>

        <!-- Configuration -->
        <b-col>
          <div class="accordion" role="tablist">
            <!-- Settings -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-1'" variant="primary">Settings</b-button>
              </b-card-header>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  Here are some settings
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Up Stream Keyers -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-2'" variant="info">Up Stream Keyer 1</b-button>
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  Here are some other settings
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Down Stream Keyers -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-3'" variant="warning">Down Stream Keyer 1</b-button>
              </b-card-header>
              <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  Here are some other settings
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

  export default {
    name: 'MixEffect',
    components: {
      MixEffectCrosspoint
    },
    props: {},
    data() {
      return {};
    },
    methods: {

    },
    computed: {
      signals() {
        return this.$store.getters["mixEffect/getInputs"](this.$route.params.name);
      },
      pgm() {
        return this.$store.getters["mixEffect/getProgram"](this.$route.params.name);
      },
      pvw() {
        return this.$store.getters["mixEffect/getPreview"](this.$route.params.name);
      }
    }
  }
</script>