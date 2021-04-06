<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Cenital Web Control</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <!-- Inputs dropdown -->
          <b-nav-item-dropdown text="Inputs" right>
            <b-dropdown-item-button v-for="(item, index) in inputs" :key="index">
              {{ item }}
            </b-dropdown-item-button>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button v-b-modal="'add-input'">
              Add Input
            </b-dropdown-item-button>	

          </b-nav-item-dropdown>

          <!-- Outputs dropdown -->
          <b-nav-item-dropdown text="Outputs" right>
            <b-dropdown-item-button v-for="(item, index) in outputs" :key="index">
              {{ item }}
            </b-dropdown-item-button>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button v-b-modal="'add-output'">
              Add Output
            </b-dropdown-item-button>	

          </b-nav-item-dropdown>

          <!-- Mix Effects dropdown -->
          <b-nav-item-dropdown text="Mix Effects" right>
            <b-dropdown-item-button v-for="(item, index) in mixEffects" :key="index">
              {{ item }}
            </b-dropdown-item-button>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button v-b-modal="'add-mix-effect'">
              Add M/E	
            </b-dropdown-item-button>	

          </b-nav-item-dropdown>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <AddMixEffect />
  </div>
</template>

<script>
  import AddMixEffect from "./AddMixEffect.vue"

  export default {
    name: "Navbar",
    components: {
      AddMixEffect,

    },

    data() {
      return {

      };
    }
  };
</script>