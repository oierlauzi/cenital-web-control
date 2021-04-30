<style scoped>

</style>

<template>
  <div>
    <b-container fluid class="text-center">
      <!-- T-Bar -->
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <MixEffectTransitionTBar :value="progress" @input="moved"/>
        </b-col>
      </b-row>

      <!-- Controls -->
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <b-form-select :options="transitions" :value="transitionType"/>
        </b-col>
        <b-col>
          <b-input-group 
            append="ms" 
          >
            <b-form-input 
              :value="transitionDuration" 
              type="number" 
              min="0" step="0.1" 
            />
          </b-input-group>
           
        </b-col>

      </b-row>
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <b-button variant="warning" @click="cut">
            Cut
          </b-button>
        </b-col>
        <b-col>
          <b-button variant="warning" @click="preview">
            Trans
          </b-button>
        </b-col>
        <b-col>
          <b-button variant="success" @click="transition">
            Prev
          </b-button>
        </b-col>

      </b-row>

    </b-container>

    <div class="w-100" />



  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import MixEffectTransitionTBar from "./MixEffectTransitionTBar"

  export default {
    name: "MixEffectTransition",
    components: {
      MixEffectTransitionTBar
    },
    props: {
      mixEffect: { type: String, required: true }
    },
    data() {
      return {
        progress: 0.0,
      };
    },
    methods: {
      moved(value) {
        this.progress = value;
      },
      cut() {
        //TODO
      },
      preview() {
        //TODO
      },
      transition() {
        //TODO
      }
    },
    computed: {
      ...mapGetters("mixEffect", [ 
        "getTransitionType",
        "getTransitionDuration"
      ]),

      transitionType() {
        return this.getTransitionType(this.mixEffect);
      },
      transitionDuration() {
        return this.getTransitionDuration(this.mixEffect);
      },

      transitions() {
        return ["Mix", "DVE"];
      }
    }
  };
</script>