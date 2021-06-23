<template>
  <div>
    <h3>TODO: {{effect}} transition settings</h3>
  </div>
</template>

<script>
  export default {
    name: "MixEffectTransitionEffect",
    components: {},
    props: {
      name: { type: String, required: true },
      effect: { type: String, required: true },
    },
    data() {
      return {};
    },
    methods: {},
    computed: {}
  };
</script>