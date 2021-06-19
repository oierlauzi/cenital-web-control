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
            <!-- NDI -->
            <b-dropdown-group header="NDI">
              <b-dropdown-item 
                v-for="(item, index) in ndiInputs" :key="index"
                :to="{ name: 'input-ndi', params: { name: item }  }"
              >
                {{ item }}
              </b-dropdown-item>

              <b-dropdown-divider />

              <b-dropdown-item-button v-b-modal="'add-input-ndi'">
                Add NDI
              </b-dropdown-item-button>	
            </b-dropdown-group>

            <!-- Media player -->
            <b-dropdown-group header="Media player">
              <b-dropdown-item 
                v-for="(item, index) in empty" :key="index"
              >
                {{ item.name }}
              </b-dropdown-item>

              <b-dropdown-divider />

              <b-dropdown-item-button v-b-modal="'add-input-media-player'">
                Add media player
              </b-dropdown-item-button>	
            </b-dropdown-group>
            
          </b-nav-item-dropdown>

          <!-- Outputs dropdown -->
          <b-nav-item-dropdown text="Outputs" right>
            <!-- Window -->
            <b-dropdown-group header="Window">
              <b-dropdown-item 
                v-for="(item, index) in outputWindows" :key="index"
                :to="{ name: 'output-window', params: { name: item }  }"
              >
                {{ item }}
              </b-dropdown-item>

              <b-dropdown-divider />

              <b-dropdown-item-button v-b-modal="'add-output-window'">
                Add window
              </b-dropdown-item-button>	
            </b-dropdown-group>

          </b-nav-item-dropdown>

          <!-- Mix Effects dropdown -->
          <b-nav-item-dropdown text="Mix Effects" right>
            <b-dropdown-item 
              v-for="(item, index) in mixEffects" :key="index"
              :to="{ name: 'mix-effect', params: { name: item }  }"
            >
              {{ item }}
            </b-dropdown-item>

            <b-dropdown-divider />

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

      ndiInputs() {
        return this.$store.getters["inputNdi/list"];
      },

      outputWindows() {
        return this.$store.getters["outputWindow/list"];
      },

      empty() {
        return [];
      },
    }
  };
</script>