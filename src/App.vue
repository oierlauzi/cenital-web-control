<template>
  <div id="app">
    <Navbar :mixEffects="[ { name: 'Test M/E' } ]"/>
    <router-view />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  
  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>