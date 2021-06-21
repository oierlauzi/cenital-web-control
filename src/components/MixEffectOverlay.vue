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

    </b-container>




    <h3> TODO: {{ overlaySlot.toUpperCase() }} Keyer {{ index }} </h3>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import { rad2deg, deg2rad } from '../utils/radian'
  import { quat2euler, euler2quat } from '../utils/quaternion'

  import VectorInput from './VectorInput'
  import BlendingModeSelect from './BlendingModeSelect'
  import ScalingModeSelect from './ScalingModeSelect'
  import ScalingFilterSelect from './ScalingFilterSelect'

  export default {
    name: "MixEffectKeyer",
    components: {
      VectorInput,
      BlendingModeSelect,
      ScalingModeSelect,
      ScalingFilterSelect,
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
    },
    computed: {
      ...mapGetters("mixEffect", [ 
        'getOverlayVisible',
        'getOverlayTransition',
        'getOverlayPosition',
        'getOverlayRotation',
        'getOverlayScale',
        'getOverlayOpacity',
        'getOverlayBlendingMode',
        'getOverlayScalingMode',
        'getOverlayScalingFilter',
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
    }
  };
</script>