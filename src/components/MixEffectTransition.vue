<style scoped>

</style>

<template>
  <div>
    <b-container fluid class="text-center">
      <!-- T-Bar -->
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <MixEffectTransitionBar :value="transitionBarProgress" :reverse="transitionBarReverse" @input="onTransitionBarMove"/>
        </b-col>
      </b-row>

      <!-- Controls -->
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <b-form-select 
            :options="transitionEffects" 
            :value="transitionEffect"
            @input="onTransitionEffect"
          />
        </b-col>
        <b-col>
          <b-input-group 
            append="s" 
          >
            <b-form-input 
              :value="transitionDuration" 
              type="number" 
              min="0" step="0.1" 
              @input="onTransitionDuration"
            />
          </b-input-group>
           
        </b-col>

      </b-row>
      <b-row align-h="center" align-v="start" class="my-3">

        <b-col>
          <b-button variant="outline-warning" :pressed="transitionPreview" @click="onTransitionPreview">
            Prev
          </b-button>
        </b-col>
        <b-col>
          <b-button variant="warning" @click="onTransition">
            Auto
          </b-button>
        </b-col>
        <b-col>
          <b-button variant="warning" @click="onCut">
            Cut
          </b-button>
        </b-col>

      </b-row>

    </b-container>

    <div class="w-100" />



  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import MixEffectTransitionBar from "./MixEffectTransitionBar"

  export default {
    name: "MixEffectTransition",
    components: {
      MixEffectTransitionBar
    },
    props: {
      mixEffect: { type: String, required: true }
    },
    data() {
      return {
        transitionBarReverse: false,
        transitionBarProgress: 0.0
      };
    },
    methods: {
      onCut() {
        this.$store.dispatch('mixEffect/cut', this.mixEffect);
      },
      onTransition() {
        this.$store.dispatch('mixEffect/transition', this.mixEffect);
      },
      onTransitionBarMove(value) {
        //Update the value locally, so that it is smooth
        this.transitionBarProgress = value;

        //Transmit the new value
        this.$store.dispatch('mixEffect/setTransitionBar', { name: this.mixEffect, progress: this.transitionBarProgress });

        //If it is the end, toggle reverse
        if(value >= 1.0) {
          this.transitionBarReverse = !this.transitionBarReverse;
        }
      },
      onTransitionEffect(effect) {
        this.$store.dispatch('mixEffect/setTransitionEffect', { name: this.mixEffect, effect: effect });
      },
      onTransitionDuration(duration) {
        this.$store.dispatch('mixEffect/setTransitionDuration', { name: this.mixEffect, duration: duration });
      },
      onTransitionPreview() {
        //Toggle the preview value
        this.$store.dispatch('mixEffect/setTransitionPreview', { name: this.mixEffect, enabled: !this.transitionPreview });
      }
    },
    computed: {
      ...mapGetters("mixEffect", [
        "getTransitionEffects",
        "getTransitionEffect",
        "getTransitionDuration",
        "getTransitionPreview"
      ]),

      transitionEffects() {
        return this.getTransitionEffects(this.mixEffect);
      },
      transitionEffect() {
        return this.getTransitionEffect(this.mixEffect);
      },
      transitionDuration() {
        return this.getTransitionDuration(this.mixEffect);
      },
      transitionPreview() {
        return this.getTransitionPreview(this.mixEffect);
      }
    }
  };
</script>