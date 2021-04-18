<template>
  <div id="app">
    <TheNavbar :mixEffects="[ { name: 'Test M/E' } ]"/>
    <AddMixEffectModal/>
    <router-view />
  </div>
</template>

<script>
  import TheNavbar from './components/TheNavbar.vue';
  import AddMixEffectModal from './components/AddMixEffectModal.vue';
  
  export default {
    name: 'App',
    components: {
      TheNavbar,
      AddMixEffectModal
    }
  }
</script>