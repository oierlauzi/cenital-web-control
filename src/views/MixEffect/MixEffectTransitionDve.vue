<template>
  <div>
    <b-container fluid>

      <!-- Effect -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-effect">
            Effect:
          </label>
        </b-col>
        <b-col sm="6">
          <DveTransitionEffectSelect
            ref="select-effect" 
            :value="effect"
            @change="onEffectChange"
          />
        </b-col>
      </b-row>

      <!-- Angle -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-angle">
            Angle:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-input
            ref="input-angle"
            type="number"
            :value="angle"
            @change="onAngleChange"
          />
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import DveTransitionEffectSelect from '@/components/DveTransitionEffectSelect' 

  export default {
    name: "MixEffectTransitionDve",
    components: {
      DveTransitionEffectSelect
    },
    props: {
      name: { type: String, required: true },
    },
    data() {
      return {};
    },
    methods: {
      onEffectChange(value) {
        this.$store.dispatch('mixEffect/setDveTransitionEffect', { name: this.name, value });
      },
      onAngleChange(value) {
        this.$store.dispatch('mixEffect/setDveTransitionAngle', { name: this.name, value });
      }
    },
    computed: {
      ...mapGetters('mixEffect', [ 
        'getDveTransitionEffect',
        'getDveTransitionAngle',
      ]),



      effect() {
        return this.getDveTransitionEffect(this.name);
      },
      angle() {
        return this.getDveTransitionAngle(this.name);
      },
    }
  };
</script>