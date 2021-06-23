<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>
    <OutputWindowSettings :name="name" />
  </div>
</template>

<script>
  import OutputWindowSettings from './OutputWindowSettings'

  export default {
    name: 'OutputWindow',
    components: {
      OutputWindowSettings
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