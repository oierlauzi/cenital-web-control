<template>
  <div id="app">
    <TheNavbar/>
    <AddMixEffectModal/>
    <AddInputNdiModal />
    <AddInputMediaPlayerModal />
    <AddOutputWindowModal />
    <router-view />
  </div>
</template>

<script>
  import TheNavbar from './components/TheNavbar.vue';
  import AddMixEffectModal from './components/AddMixEffectModal.vue';
  import AddInputNdiModal from './components/AddInputNdiModal.vue';
  import AddInputMediaPlayerModal from './components/AddInputMediaPlayerModal.vue';
  import AddOutputWindowModal from './components/AddOutputWindowModal.vue';
  
  export default {
    name: 'App',
    components: {
      TheNavbar,
      AddMixEffectModal,
      AddInputNdiModal,
      AddInputMediaPlayerModal,
      AddOutputWindowModal
    }
  }
</script>