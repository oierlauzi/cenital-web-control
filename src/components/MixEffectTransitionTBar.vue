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

  /* Used to create vertical progress bar */
  .progress-bar-vertical {
    display: inline-block;
    width: 180px;
    height: 15px;
    transform-origin: 90px 90px;
    transform: rotate(-90deg);
  }


</style>

<template>
  <div>
    <div class="mx-4 slider-vertical">
      <b-form-input @input="tBarMoved" type="range" min="0" max="1024" />
    </div>
    <div class="mx-4 progress-bar-vertical">
      <b-progress :value="progress*1024" min="0" max="1024" />
    </div>

  </div>
</template>

<script>
  export default {
    name: "MixEffectTransitionTBar",
    components: {},
    props: {
      progress: { type: Number, default: 0.5 },
      reverse: { type: Boolean, default: false },
    },
    data() {
      return {};
    },
    methods: {
      tBarMoved(value) {
        //Calculate the value to be sent
        value /= 1024;
        if(this.reverse) {
          value = 1.0 - value;
        }


        this.$emit("input", value);
      }
    },
    computed: {}
  };
</script>