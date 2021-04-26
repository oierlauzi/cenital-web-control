<template>
  <div>
    <MixEffectTransitionTBar />

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
      return {};
    },
    methods: {

    },
    computed: {}
  };
</script>