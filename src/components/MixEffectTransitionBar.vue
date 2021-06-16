<style scoped>
  /* Used to create vertical sliders */
  .slider-vertical {
    display: inline-block;
    width: 15px;
    height: 180px;
  }

  .slider-vertical input {
    width: 180px;
    height: 15px;
    margin: 0;
    transform-origin: 90px 90px;
    transform: rotate(-90deg);
  }
</style>

<template>
  <div>
    <div class="mx-4 slider-vertical">
      <b-form-input :value="position" @input="onMove" type="range" min="0" :max="resolution" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "MixEffectTransitionBar",
    components: {},
    props: {
      value: { type: Number, default: 0.0 },
      reverse: { type: Boolean, default: false },
      resolution: { type: Number, default: 1024 }
    },
    data() {
      return {};
    },
    methods: {
      onMove(position) {
        //Calculate the value to be sent
        position /= this.resolution;
        if(this.reverse) {
          position = 1.0 - position;
        }

        //Emit the event
        this.$emit("input", position);
      }
    },
    computed: {
      position() {
        var result = this.value;
        if(this.reverse) {
          result = 1.0 - result;
        }

        result *= this.resolution;

        return result;
      }
    }
  };
</script>