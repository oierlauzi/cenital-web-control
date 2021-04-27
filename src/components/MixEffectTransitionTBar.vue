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
      <b-form-input :value="position" @input="moved" type="range" min="0" max="1024" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "MixEffectTransitionTBar",
    components: {},
    props: {
      value: { type: Number, default: 0.0 }
    },
    data() {
      return {
        reverse: false
      };
    },
    methods: {
      moved(value) {
        //Calculate the value to be sent
        value /= 1024;
        if(this.reverse) {
          value = 1.0 - value;
        }

        //Emit the event
        this.$emit("input", value);

        //Evaluate if it needs to be reversed
        if(value === 1.0) {
          this.reverse = !this.reverse;
          this.$emit("input", 0.0);
        }
      }
    },
    computed: {
      position() {
        var result = this.value;
        if(this.reverse) {
          result = 1.0 - result;
        }

        return 1024*result;
      }
    }
  };
</script>