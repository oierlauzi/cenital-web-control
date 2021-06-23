<style scoped>
  .slider-rainbow {
    background: linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%));
  }
</style>

<template>
  <div>
    <b-container fluid>
      <!-- Visible / Transition -->
      <b-row class="my-3">
        <b-col sm="6">
          <b-button block 
            variant="outline-danger"
            :pressed="visible"
            @click="onVisibilityClick"
          >
            Visible
          </b-button>
        </b-col>
        <b-col sm="6">
          <b-button block
            variant="outline-warning"
            :pressed="transition"
            @click="onTransitionClick"
          >
            Transition
          </b-button>
        </b-col>
      </b-row>

      <!-- Feed -->
      <b-row class="my-3">
        <b-col sm="3">
          <label for="input-position">
            Aux bus feed:
          </label>
        </b-col>
        <b-col sm="9">
          <b-button-group>
            <!-- Fill -->
            <b-button
              variant="outline-primary"
              :pressed="fillInSelected"
              @click="onFillInSelectClick"
            >
              Fill
            </b-button>

            <!-- Key -->
            <b-button
              variant="outline-primary"
              :pressed="keyInSelected"
              @click="onKeyInSelectClick"
            >
              Key
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>

      <!-- Position -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-position">
            Position:
          </label>
        </b-col>
        <b-col sm="9">
          <VectorInput 
            ref="input-position"
            :value="position"
            @change="onPositionChange"
          />
        </b-col>
      </b-row>

      <!-- Rotation -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-rotation">
            Rotation:
          </label>
        </b-col>
        <b-col sm="9">
          <VectorInput 
            ref="input-rotation"
            :value="rotation"
            @change="onRotationChange"
          />
        </b-col>
      </b-row>

      <!-- Scale -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-scale">
            Rotation:
          </label>
        </b-col>
        <b-col sm="9">
          <VectorInput 
            ref="input-scale"
            :value="scale"
            @change="onScaleChange"
          />
        </b-col>
      </b-row>

      <!-- Opacity -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-opacity">
            Opacity:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            ref="input-opacity"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="opacity"
            @input="onOpacityInput"
          />
        </b-col>
      </b-row>

      <!-- Blending mode -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="select-blending-mode">
            Blending mode:
          </label>
        </b-col>
        <b-col sm="9">
          <BlendingModeSelect 
            ref="select-blending-mode"
            :value="blendingMode"
            @change="onBlendingModeChange"
          />
        </b-col>
      </b-row>

      <!-- Scaling mode -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="select-scaling-mode">
            Scaling mode:
          </label>
        </b-col>
        <b-col sm="9">
          <ScalingModeSelect 
            ref="select-scaling-mode"
            :value="scalingMode"
            @change="onScalingModeChange"
          />
        </b-col>
      </b-row>
      
      <!-- Scaling filter -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="select-scaling-filter">
            Scaling filter:
          </label>
        </b-col>
        <b-col sm="9">
          <ScalingFilterSelect 
            ref="select-scaling-filter"
            :value="scalingFilter"
            @change="onScalingFilterChange"
          />
        </b-col>
      </b-row>

      <!-- Linear key title -->
      <b-row class="my-3">
        <center><h3> Linear key </h3></center>
      </b-row>

      <!-- Linear key enabled -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="check-linear-key-enabled">
            Enabled:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-checkbox switch
            ref="check-linear-key-enabled"
            :checked="linearKeyEnabled"
            @change="onLinearKeyEnabledChange"
          />
        </b-col>
      </b-row>

      <!-- Linear key inverted -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="check-linear-key-inverted">
            Inverted:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-checkbox switch
            ref="check-linear-key-inverted"
            :checked="linearKeyInverted"
            @change="onLinearKeyInvertedChange"
          />
        </b-col>
      </b-row>

      <!-- Linear key channel -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="select-linear-key-channel">
            Channel:
          </label>
        </b-col>
        <b-col sm="9">
          <LinearKeyChannelSelect
            ref="select-linear-key-channel"
            :value="linearKeyChannel"
            @change="onLinearKeyChannelChange"
          />
        </b-col>
      </b-row>

      <!-- Luma key title -->
      <b-row class="my-3">
        <center><h3> Luma key </h3></center>
      </b-row>

      <!-- Luma key enabled -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="check-luma-key-enabled">
            Enabled:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-checkbox switch
            ref="check-luma-key-enabled"
            :checked="lumaKeyEnabled"
            @change="onLumaKeyEnabledChange"
          />
        </b-col>
      </b-row>

      <!-- Luma key inverted -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="check-luma-key-inverted">
            Inverted:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-checkbox switch
            ref="check-luma-key-inverted"
            :checked="lumaKeyInverted"
            @change="onLumaKeyInvertedChange"
          />
        </b-col>
      </b-row>

      <!-- Luma key min threshold -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-luma-key-min">
            Min:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-luma-key-min"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="lumaKeyMinThreshold"
            @input="onLumaKeyMinThresholdInput"
          />
        </b-col>
        <b-col sm="2">
          {{lumaKeyMinThreshold}}
        </b-col>
      </b-row>
      
      <!-- Luma key max threshold -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-luma-key-max">
            Max:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-luma-key-max"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="lumaKeyMaxThreshold"
            @input="onLumaKeyMaxThresholdInput"
          />
        </b-col>
        <b-col sm="2">
          {{lumaKeyMaxThreshold}}
        </b-col>
      </b-row>

      <!-- Chroma key title -->
      <b-row class="my-3">
        <center><h3> Chroma key </h3></center>
      </b-row>

      <!-- Chroma key enabled -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="check-chroma-key-enabled">
            Enabled:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-checkbox switch
            ref="check-chroma-key-enabled"
            :checked="chromaKeyEnabled"
            @change="onChromaKeyEnabledChange"
          />
        </b-col>
      </b-row>

      <!-- Chroma key hue center -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-hue-center">
            Hue center:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-hue-center"
            type="range"
            class="slider-rainbow"
            min="0"
            max="360"
            step="1"
            :value="chromaKeyHue"
            @input="onChromaKeyHueInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeyHue}} &deg;
        </b-col>
      </b-row>

      <!-- Chroma key hue span -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-hue-span">
            Hue span:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-hue-span"
            type="range"
            min="0"
            max="180"
            step="1"
            :value="chromaKeyHueSpan"
            @input="onChromaKeyHueSpanInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeyHueSpan}} &deg;
        </b-col>
      </b-row>

      <!-- Chroma key hue smoothness -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-hue-smoothness">
            Hue smoothness:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-hue-smoothness"
            type="range"
            min="0"
            max="180"
            step="1"
            :value="chromaKeyHueSmoothness"
            @input="onChromaKeyHueSmoothnessInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeyHueSmoothness}} &deg;
        </b-col>
      </b-row>

      <!-- Chroma key saturation threshold -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-sat-threshold">
            Saturation threshold:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-sat-threshold"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="chromaKeySaturationThreshold"
            @input="onChromaKeySaturationThresholdInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeySaturationThreshold}}
        </b-col>
      </b-row>

      <!-- Chroma key saturation smoothness -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-sat-smoothness">
            Saturation smoothness:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-sat-smoothness"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="chromaKeySaturationSmoothness"
            @input="onChromaKeySaturationSmoothnessInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeySaturationSmoothness}}
        </b-col>
      </b-row>

      <!-- Chroma key brightness threshold -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-val-threshold">
            Brightness threshold:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-val-threshold"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="chromaKeyBrightnessThreshold"
            @input="onChromaKeyBrightnessThresholdInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeyBrightnessThreshold}}
        </b-col>
      </b-row>

      <!-- Chroma key brightness smoothness -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-chroma-key-val-smoothness">
            Brightness smoothness:
          </label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            ref="input-chroma-key-val-smoothness"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="chromaKeyBrightnessSmoothness"
            @input="onChromaKeyBrightnessSmoothnessInput"
          />
        </b-col>
        <b-col sm="2">
          {{chromaKeyBrightnessSmoothness}}
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import { rad2deg, deg2rad } from '@/utils/radian'
  import { quat2euler, euler2quat } from '@/utils/quaternion'

  import VectorInput from '@/components/VectorInput'
  import BlendingModeSelect from '@/components/BlendingModeSelect'
  import ScalingModeSelect from '@/components/ScalingModeSelect'
  import ScalingFilterSelect from '@/components/ScalingFilterSelect'
  import LinearKeyChannelSelect from '@/components/LinearKeyChannelSelect'

  export default {
    name: "MixEffectOverlay",
    components: {
      VectorInput,
      BlendingModeSelect,
      ScalingModeSelect,
      ScalingFilterSelect,
      LinearKeyChannelSelect
    },
    props: {
      name: { type: String, required: true },
      overlaySlot: { type: String, required: true },
      index: { type: Number, required: true },
      selectedOverlayFeed: { type: Object, default: null },
    },
    data() {
      return {};
    },
    methods: {
      onVisibilityClick() {
        this.$store.dispatch('mixEffect/setOverlayVisible', { name: this.name, slot: this.overlaySlot, index: this.index, value: !this.visible });
      },
      onTransitionClick() {
        this.$store.dispatch('mixEffect/setOverlayTransition', { name: this.name, slot: this.overlaySlot, index: this.index, value: !this.transition });
      },
      onFillInSelectClick() {
        const next = this.fillInSelected ? null : this.fillInSelection;
        this.$emit("selectOverlayFeed", next);
      },
      onKeyInSelectClick() {
        const next = this.keyInSelected ? null : this.keyInSelection;
        this.$emit("selectOverlayFeed", next);
      },
      onPositionChange(value) {
        if(value) {
          this.$store.dispatch('mixEffect/setOverlayPosition', { name: this.name, slot: this.overlaySlot, index: this.index, value });
        }
      },
      onRotationChange(euler) {
        if(euler) {
          const value = euler2quat(euler.map(deg2rad));
          this.$store.dispatch('mixEffect/setOverlayRotation', { name: this.name, slot: this.overlaySlot, index: this.index, value });
        }
      },
      onScaleChange(value) {
        if(value) {
          this.$store.dispatch('mixEffect/setOverlayScale', { name: this.name, slot: this.overlaySlot, index: this.index, value });
        }
      },
      onOpacityInput(value) {
        this.$store.dispatch('mixEffect/setOverlayOpacity', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onBlendingModeChange(value) {
        this.$store.dispatch('mixEffect/setOverlayBlendingMode', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onScalingModeChange(value) {
        this.$store.dispatch('mixEffect/setOverlayScalingMode', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onScalingFilterChange(value) {
        this.$store.dispatch('mixEffect/setOverlayScalingFilter', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLinearKeyEnabledChange(value) {
        this.$store.dispatch('mixEffect/setLinearKeyEnabled', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLinearKeyInvertedChange(value) {
        this.$store.dispatch('mixEffect/setLinearKeyInverted', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLinearKeyChannelChange(value) {
        this.$store.dispatch('mixEffect/setLinearKeyChannel', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLumaKeyEnabledChange(value) {
        this.$store.dispatch('mixEffect/setLumaKeyEnabled', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLumaKeyInvertedChange(value) {
        this.$store.dispatch('mixEffect/setLumaKeyInverted', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLumaKeyMinThresholdInput(value) {
        this.$store.dispatch('mixEffect/setLumaKeyMinThreshold', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onLumaKeyMaxThresholdInput(value) {
        this.$store.dispatch('mixEffect/setLumaKeyMaxThreshold', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeyEnabledChange(value) {
        this.$store.dispatch('mixEffect/setChromaKeyEnabled', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeyHueInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeyHue', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeyHueSpanInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeyHueSpan', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeyHueSmoothnessInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeyHueSmoothness', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeySaturationThresholdInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeySaturationThreshold', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeySaturationSmoothnessInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeySaturationSmoothness', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeyBrightnessThresholdInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeyBrightnessThreshold', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },
      onChromaKeyBrightnessSmoothnessInput(value) {
        this.$store.dispatch('mixEffect/setChromaKeyBrightnessSmoothness', { name: this.name, slot: this.overlaySlot, index: this.index, value });
      },

    },
    computed: {
      ...mapGetters('mixEffect', [ 
        'getOverlayVisible',
        'getOverlayTransition',
        'getOverlayPosition',
        'getOverlayRotation',
        'getOverlayScale',
        'getOverlayOpacity',
        'getOverlayBlendingMode',
        'getOverlayScalingMode',
        'getOverlayScalingFilter',
        'getLinearKeyEnabled',
        'getLinearKeyInverted',
        'getLinearKeyChannel',
        'getLumaKeyEnabled',
        'getLumaKeyInverted',
        'getLumaKeyMinThreshold',
        'getLumaKeyMaxThreshold',
        'getChromaKeyEnabled',
        'getChromaKeyHue',
        'getChromaKeyHueSpan',
        'getChromaKeyHueSmoothness',
        'getChromaKeySaturationThreshold',
        'getChromaKeySaturationSmoothness',
        'getChromaKeyBrightnessThreshold',
        'getChromaKeyBrightnessSmoothness',
      ]),

      fillInSelection() {
        return {
          name: this.name,
          slot: this.overlaySlot,
          index: this.index,
          feed: 'fillIn'
        }
      },
      keyInSelection() {
        return {
          name: this.name,
          slot: this.overlaySlot,
          index: this.index,
          feed: 'keyIn'
        }
      },



      visible() {
        return this.getOverlayVisible(this.name, this.overlaySlot, this.index);
      },
      transition() {
        return this.getOverlayTransition(this.name, this.overlaySlot, this.index);
      },
      fillInSelected() {
        return this.selectedOverlayFeed === this.fillInSelection;
      },
      keyInSelected() {
        return this.selectedOverlayFeed === this.keyInSelection;
      },
      position() {
        return this.getOverlayPosition(this.name, this.overlaySlot, this.index);
      },
      rotation() {
        const quat = this.getOverlayRotation(this.name, this.overlaySlot, this.index);
        return quat2euler(quat).map(rad2deg);
      },
      scale() {
        return this.getOverlayScale(this.name, this.overlaySlot, this.index);
      },
      opacity() {
        return this.getOverlayOpacity(this.name, this.overlaySlot, this.index);
      },
      blendingMode() {
        return this.getOverlayBlendingMode(this.name, this.overlaySlot, this.index);
      },
      scalingMode() {
        return this.getOverlayScalingMode(this.name, this.overlaySlot, this.index);
      },
      scalingFilter() {
        return this.getOverlayScalingFilter(this.name, this.overlaySlot, this.index);
      },
      linearKeyEnabled() {
        return this.getLinearKeyEnabled(this.name, this.overlaySlot, this.index);
      },
      linearKeyInverted() {
        return this.getLinearKeyInverted(this.name, this.overlaySlot, this.index);
      },
      linearKeyChannel() {
        return this.getLinearKeyChannel(this.name, this.overlaySlot, this.index);
      },
      lumaKeyEnabled() {
        return this.getLumaKeyEnabled(this.name, this.overlaySlot, this.index);
      },
      lumaKeyInverted() {
        return this.getLumaKeyInverted(this.name, this.overlaySlot, this.index);
      },
      lumaKeyMinThreshold() {
        return this.getLumaKeyMinThreshold(this.name, this.overlaySlot, this.index);
      },
      lumaKeyMaxThreshold() {
        return this.getLumaKeyMaxThreshold(this.name, this.overlaySlot, this.index);
      },
      chromaKeyEnabled() {
        return this.getChromaKeyEnabled(this.name, this.overlaySlot, this.index);
      },
      chromaKeyHue() {
        return this.getChromaKeyHue(this.name, this.overlaySlot, this.index);
      },
      chromaKeyHueSpan() {
        return this.getChromaKeyHueSpan(this.name, this.overlaySlot, this.index);
      },
      chromaKeyHueSmoothness() {
        return this.getChromaKeyHueSmoothness(this.name, this.overlaySlot, this.index);
      },
      chromaKeySaturationThreshold() {
        return this.getChromaKeySaturationThreshold(this.name, this.overlaySlot, this.index);
      },
      chromaKeySaturationSmoothness() {
        return this.getChromaKeySaturationSmoothness(this.name, this.overlaySlot, this.index);
      },
      chromaKeyBrightnessThreshold() {
        return this.getChromaKeyBrightnessThreshold(this.name, this.overlaySlot, this.index);
      },
      chromaKeyBrightnessSmoothness() {
        return this.getChromaKeyBrightnessSmoothness(this.name, this.overlaySlot, this.index);
      },
    }
  };
</script>