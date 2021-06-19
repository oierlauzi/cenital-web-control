<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>
    <InputNdiControl :name="name" />
  </div>
</template>

<script>
  import InputNdiControl from '../components/InputNdiControl'

  export default {
    name: 'InputNdi',
    components: {
      InputNdiControl
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