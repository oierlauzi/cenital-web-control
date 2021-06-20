<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>
    <InputMediaPlayerControl :name="name" />
  </div>
</template>

<script>
  import InputMediaPlayerControl from '../components/InputMediaPlayerControl'

  export default {
    name: 'InputNdi',
    components: {
      InputMediaPlayerControl
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