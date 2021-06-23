<template>
  <div>
    <!-- Title -->
    <h1 class="mx-3 my-3 text-center">{{ name }}</h1>
    <InputMediaPlayerSettings :name="name" />

    <!-- Add clip modal -->
    <InputMediaPlayerAddClipModal :name="name" />
  </div>
</template>

<script>
  import InputMediaPlayerSettings from './InputMediaPlayerSettings'
  import InputMediaPlayerAddClipModal from './InputMediaPlayerAddClipModal'

  export default {
    name: 'InputNdi',
    components: {
      InputMediaPlayerSettings,
      InputMediaPlayerAddClipModal
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