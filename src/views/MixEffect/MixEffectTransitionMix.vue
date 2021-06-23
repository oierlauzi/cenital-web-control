<template>
  <div>
    <b-container fluid>

      <!-- Effect -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-effect">
            Effect:
          </label>
        </b-col>
        <b-col sm="6">
          <MixTransitionEffectSelect
            ref="input-effect" 
            :value="effect"
            @change="onEffectChange"
          />
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import MixTransitionEffectSelect from '@/components/MixTransitionEffectSelect' 

  export default {
    name: "MixEffectTransitionMix",
    components: {
      MixTransitionEffectSelect
    },
    props: {
      name: { type: String, required: true },
    },
    data() {
      return {};
    },
    methods: {
      onEffectChange(value) {
        this.$store.dispatch('mixEffect/setMixTransitionEffect', { name: this.name, value });
      }
    },
    computed: {
      ...mapGetters('mixEffect', [ 
        'getMixTransitionEffect',
      ]),



      effect() {
        return this.getMixTransitionEffect(this.name);
      }
    }
  };
</script>