<template>
  <div>
    <MixEffectTransitionTBar :value="progress" @input="moved"/>

  </div>
</template>

<script>
  import MixEffectTransitionTBar from "./MixEffectTransitionTBar"

  export default {
    name: "MixEffectTransition",
    components: {
      MixEffectTransitionTBar
    },
    props: {
      mixEffect: { type: String, required: true }
    },
    data() {
      return {
        progress: 0.0,
      };
    },
    methods: {
      moved(value) {
        this.progress = value;
      }
    },
    computed: {}
  };
</script>