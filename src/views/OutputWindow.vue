<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>
    <OutputWindowControl :name="name" />
  </div>
</template>

<script>
  import OutputWindowControl from '../components/OutputWindowControl'

  export default {
    name: 'OutputWindow',
    components: {
      OutputWindowControl
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