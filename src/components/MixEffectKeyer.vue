<template>
  <div>
    <h3> TODO: {{ type.toUpperCase() }} Keyer {{ num }} </h3>

  </div>
</template>

<script>
  export default {
    name: "MixEffectKeyer",
    components: {},
    props: {
      mixEffect: { type: String, required: true },
      type: { type: String, required: true },
      num: { type: Number, required: true }
    },
    data() {
      return {};
    },
    methods: {},
    computed: {}
  };
</script>