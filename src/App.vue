<template>
  <div id="app">
    <TheNavbar/>
    <AddMixEffectModal/>
    <AddOutputWindowModal />
    <router-view />
  </div>
</template>

<script>
  import TheNavbar from './components/TheNavbar.vue';
  import AddMixEffectModal from './components/AddMixEffectModal.vue';
  import AddOutputWindowModal from './components/AddOutputWindowModal.vue';
  
  export default {
    name: 'App',
    components: {
      TheNavbar,
      AddMixEffectModal,
      AddOutputWindowModal
    }
  }
</script>