<template>
  <div>
    <!-- Error message -->
    <b-jumbotron
		header="Page not found" 
		lead="Ensure that you correctly typed the address" 
	>
		<b-button :to="{ name: 'home' }">Go to Home</b-button>
	</b-jumbotron>


  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    components: {},
    props: {}
  }
</script>