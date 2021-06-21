<template>
  <div>
    <b-container fluid>
      <!-- Delete -->
      <b-row class="my-3">
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
            @change="onInputCountChange"
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
            @change="onUpstreamOverlayCountChange"
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
            @change="onDownstreamOverlayCountChange"
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
            @change="onScalingModeChange"
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
            @change="onScalingFilterChange"
          />
        </b-col>
      </b-row> 

    </b-container>

    <!-- Video mode -->
    <VideoModeConfigure :name="name" />

  </div>
</template>

<script>
  import ScalingModeSelect from './ScalingModeSelect'
  import ScalingFilterSelect from './ScalingFilterSelect'
  import VideoModeConfigure from './VideoModeConfigure'

  export default {
    name: "MixEffectSettings",
    components: {
      ScalingModeSelect,
      ScalingFilterSelect,
      VideoModeConfigure
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {};
    },
    methods: {
      onDelete() {
        this.$router.push({ name: 'home' }); //FIXME this should be done on the commit, when it actually gets deleted
        this.$store.dispatch('mixEffect/delete', this.name);
      },

      onInputCountChange(count) {
        this.$store.dispatch('mixEffect/setInputCount', { name: this.name, value: count });
      },
      onUpstreamOverlayCountChange(count) {
        this.$store.dispatch('mixEffect/setOverlayCount', { name: this.name, slot: 'upstream', value: count });
      },
      onDownstreamOverlayCountChange(count) {
        this.$store.dispatch('mixEffect/setOverlayCount', { name: this.name, slot: 'downstream', value: count });
      },
      onScalingModeChange(value) {
        this.$store.dispatch('mixEffect/setScalingMode', { name: this.name, value: value });
      },
      onScalingFilterChange(value) {
        this.$store.dispatch('mixEffect/setScalingFilter', { name: this.name, value: value });
      },
    },
    computed: {
      inputCount() {
        return this.$store.getters['mixEffect/getInputCount'](this.name);
      },
      upstreamOverlayCount() {
        return this.$store.getters['mixEffect/getOverlayCount'](this.name, 'upstream');
      },
      downstreamOverlayCount() {
        return this.$store.getters['mixEffect/getOverlayCount'](this.name, 'downstream');
      },
      scalingMode() {
        return this.$store.getters['mixEffect/getScalingMode'](this.name);
      },
      scalingFilter() {
        return this.$store.getters['mixEffect/getScalingFilter'](this.name);
      }
    }
  };
</script>