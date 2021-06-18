<template>
  <div>
    <b-container fluid>
      <!-- Input count -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-input-count">
            Input count:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-input 
            ref="input-input-count" 
            type="number" 
            min="0" 
            step="1"
            :value="inputCount"
            @input="onInputCountInput"
          />
        </b-col>
      </b-row>

      <!-- Upstream overlay count -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-us-overlay-count">
            Upstream overlay count:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-input 
            ref="input-us-overlay-count" 
            type="number" 
            min="0" 
            step="1"
            :value="upstreamOverlayCount"
            @input="onUpstreamOverlayCountInput"
          />
        </b-col>
      </b-row>

      <!-- Downstream overlay count -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-ds-overlay-count">
            Downstream overlay count:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-input 
            ref="input-ds-overlay-count" 
            type="number" 
            min="0" 
            step="1"
            :value="downstreamOverlayCount"
            @input="onDownstreamOverlayCountInput"
          />
        </b-col>
      </b-row>

      <!-- Scaling mode -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-scaling-mode">
            Video scaling mode:
          </label>
        </b-col>
        <b-col sm="6">
          <ScalingModeSelect 
            ref="select-scaling-mode"
            :value="scalingMode"
            @input="onScalingModeInput"
          />
        </b-col>
      </b-row>

      <!-- Scaling filter -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-scaling-filter">
            Video scaling filter:
          </label>
        </b-col>
        <b-col sm="6">
          <ScalingFilterSelect
            ref="select-scaling-filter"
            :value="scalingFilter"
            @input="onScalingFilterInput"
          />
        </b-col>
      </b-row> 





      <!-- Delete -->
      <b-row class="my-1">
        <b-col sm="12">
          <b-button 
            block
            variant="danger"
            @click="onDelete"
          >
            Delete
          </b-button>
        </b-col>
      </b-row>

    </b-container>

    <h3>TODO: Mix effect settings</h3>
  </div>
</template>

<script>
  import ScalingModeSelect from './ScalingModeSelect'
  import ScalingFilterSelect from './ScalingFilterSelect'

  export default {
    name: "MixEffectSettings",
    components: {
      ScalingModeSelect,
      ScalingFilterSelect,
    },
    props: {
      mixEffect: { type: String, required: true }
    },
    data() {
      return {};
    },
    methods: {
      onInputCountInput(count) {
        this.$store.dispatch('mixEffect/setInputCount', { name: this.mixEffect, count: count });
      },
      onUpstreamOverlayCountInput(count) {
        this.$store.dispatch('mixEffect/setUpstreamOverlayCount', { name: this.mixEffect, count: count });
      },
      onDownstreamOverlayCountInput(count) {
        this.$store.dispatch('mixEffect/setDownstreamOverlayCount', { name: this.mixEffect, count: count });
      },
      onScalingModeInput(value) {
        this.$store.dispatch('mixEffect/setScalingMode', { name: this.mixEffect, mode: value });
      },
      onScalingFilterInput(value) {
        this.$store.dispatch('mixEffect/setScalingFilter', { name: this.mixEffect, filter: value });
      },


      onDelete() {
        this.$router.push({ name: 'home' }); //FIXME this should be done on the commit, when it actually gets deleted
        this.$store.dispatch('mixEffect/delete', this.mixEffect);
      }
    },
    computed: {
      inputCount() {
        return this.$store.getters['mixEffect/getInputCount'](this.mixEffect);
      },
      upstreamOverlayCount() {
        return this.$store.getters['mixEffect/getUpstreamOverlayCount'](this.mixEffect);
      },
      downstreamOverlayCount() {
        return this.$store.getters['mixEffect/getDownstreamOverlayCount'](this.mixEffect);
      },
      scalingMode() {
        return this.$store.getters['mixEffect/getScalingMode'](this.mixEffect);
      },
      scalingFilter() {
        return this.$store.getters['mixEffect/getScalingFilter'](this.mixEffect);
      }
    }
  };
</script>