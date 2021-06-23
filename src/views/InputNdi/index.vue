<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>
    <InputNdiSettings :name="name" />
  </div>
</template>

<script>
  import InputNdiSettings from './InputNdiSettings'

  export default {
    name: 'InputNdi',
    components: {
      InputNdiSettings
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