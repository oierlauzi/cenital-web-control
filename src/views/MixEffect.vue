<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>

    <!-- The controls -->
    <MixEffectControl :name="name" />
  </div>
</template>

<script>
  import MixEffectControl from "../components/MixEffectControl"

  export default {
    name: 'MixEffect',
    components: {
      MixEffectControl
    },
    props: {},
    data() {
      return {};
    },
    methods: {},
    computed: {
      name() {
        return this.$route.params.name;
      }
    }
  }
</script>