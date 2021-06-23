<style scoped>

</style>

<template>
  <div>
    <b-container fluid class="text-center">
      <!-- T-Bar -->
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <TransitionBar :value="transitionBarProgress" :reverse="transitionBarReverse" @input="onTransitionBarMove"/>
        </b-col>
      </b-row>

      <!-- Controls -->
      <b-row align-h="center" align-v="start" class="my-3">
        <b-col>
          <TransitionEffectSelect
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import TransitionBar from "@/components/TransitionBar"
  import TransitionEffectSelect from "@/components/TransitionEffectSelect"

  export default {
    name: "MixEffectTransition",
    components: {
      TransitionBar,
      TransitionEffectSelect
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {
        transitionBarReverse: false,
        transitionBarProgress: 0.0
      };
    },
    methods: {
      onCut() {
        this.$store.dispatch('mixEffect/cut', this.name);
      },
      onTransition() {
        this.$store.dispatch('mixEffect/transition', this.name);
      },
      onTransitionBarMove(value) {
        //Update the value locally, so that it is smooth
        this.transitionBarProgress = value;

        //Transmit the new value
        this.$store.dispatch('mixEffect/setTransitionBar', { name: this.name, value: this.transitionBarProgress });

        //If it is the end, toggle reverse
        if(this.transitionBarProgress >= 1.0) {
          this.transitionBarProgress = 0.0;
          this.transitionBarReverse = !this.transitionBarReverse;
        }
      },
      onTransitionEffect(effect) {
        this.$store.dispatch('mixEffect/setTransitionSelectedEffect', { name: this.name, value: effect });
      },
      onTransitionDuration(duration) {
        this.$store.dispatch('mixEffect/setTransitionDuration', { name: this.name, value: duration });
      },
      onTransitionPreview() {
        //Toggle the preview value
        this.$store.dispatch('mixEffect/setTransitionPreview', { name: this.name, value: !this.transitionPreview });
      }
    },
    computed: {
      ...mapGetters("mixEffect", [
        "getTransitionBar",
        "getTransitionDuration",
        "getTransitionPreview",
        "getTransitionSelectedEffect",
      ]),

      transitionEffect() {
        return this.getTransitionSelectedEffect(this.name);
      },
      transitionDuration() {
        return this.getTransitionDuration(this.name);
      },
      transitionPreview() {
        return this.getTransitionPreview(this.name);
      }
    }
  };
</script>