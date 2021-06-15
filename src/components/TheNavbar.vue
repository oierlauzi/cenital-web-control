<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand 
        :to="{ name: 'home' }"
      >
        {{ $appName }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <!-- Inputs dropdown -->
          <b-nav-item-dropdown text="Inputs" right>
            <b-dropdown-item 
              v-for="(item, index) in inputs" :key="index"
            >
              {{ item.name }}
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button v-b-modal="'add-input'">
              Add Input
            </b-dropdown-item-button>	

          </b-nav-item-dropdown>

          <!-- Outputs dropdown -->
          <b-nav-item-dropdown text="Outputs" right>
            <b-dropdown-item 
              v-for="(item, index) in outputs" :key="index"
            >
              {{ item.name }}
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button v-b-modal="'add-output'">
              Add Output
            </b-dropdown-item-button>	

          </b-nav-item-dropdown>

          <!-- Mix Effects dropdown -->
          <b-nav-item-dropdown text="Mix Effects" right>
            <b-dropdown-item 
              v-for="(item, index) in mixEffects" :key="index"
              :to="{ name: 'mix-effect', params: { name: item }  }"
            >
              {{ item }}
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button v-b-modal="'add-mix-effect'">
              Add M/E	
            </b-dropdown-item-button>	

          </b-nav-item-dropdown>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <NavbarConnection />
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import NavbarConnection from "./NavbarConnection"

  export default {
    name: "TheNavbar",
    components: {
      NavbarConnection
    },
    props: {},
    data() {
      return {};
    },
    computed: {
      mixEffects() {
        return this.$store.getters["mixEffect/list"];
      },
      inputs() {
        return [];
      },
      outputs() {
        return [];
      }
    }
  };
</script>