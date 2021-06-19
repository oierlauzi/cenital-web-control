<template>
  <div id="app">
    <TheNavbar/>
    <AddMixEffectModal/>
    <AddInputNdi />
    <AddOutputWindowModal />
    <router-view />
  </div>
</template>

<script>
  import TheNavbar from './components/TheNavbar.vue';
  import AddMixEffectModal from './components/AddMixEffectModal.vue';
  import AddInputNdi from './components/AddInputNdi.vue';
  import AddOutputWindowModal from './components/AddOutputWindowModal.vue';
  
  export default {
    name: 'App',
    components: {
      TheNavbar,
      AddMixEffectModal,
      AddInputNdi,
      AddOutputWindowModal
    }
  }
</script>