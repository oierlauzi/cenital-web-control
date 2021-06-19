<template>
  <div>
    <b-container fluid="sm">
      <!-- Delete -->
      <b-row class="my-3">
        <b-col sm="12">
          <b-button 
            block
            variant="danger"
            @click="onDelete"
          >
            Delete
          </b-button>
        </b-col>
      </b-row>

      <!-- Source -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-source">
            Source:
          </label>
        </b-col>
        <b-col sm="6">
          <b-input-group ref="select-source">
            <!-- Selector -->
            <b-form-select 
              :value="source" 
              :options="sourceOptions" 
              @change="onSourceChange"
            >
              <!--No signal option-->
              <template #first>
                <b-form-select-option :value="null">
                  No source
                </b-form-select-option>
              </template>

            </b-form-select>

            <b-input-group-append>
              <b-button variant="outline-success" @click="onRefreshSources">
                Refresh
              </b-button>
            </b-input-group-append>

          </b-input-group>
        </b-col>
      </b-row>

    </b-container>


    <!-- Video mode -->
    <VideoModeConfigure :name="name" />

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import VideoModeConfigure from './VideoModeConfigure' 

  export default {
    name: 'InputNdiControl',
    components: {
      VideoModeConfigure
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {};
    },
    methods: {
      onDelete() {
        this.$router.push({ name: 'home' }); //FIXME this should be done on the commit, when it actually gets deleted
        this.$store.dispatch('inputNdi/delete', this.name);
      },
      onRefreshSources() {
        this.$store.dispatch('inputNdi/fetchSources', this.name);
      },

      onSourceChange(value) {
        this.$store.dispatch('inputNdi/setSource', { name: this.name, value: value });
      }

    },
    computed: {
      ...mapGetters('inputNdi', [ 
        'getSources',
        'getSource',
 
      ]),

      sourceOptions() {
        const sources = this.getSources(this.name)
        return sources.map(source => {
          return { value: source, text: source };
        });
      },
      source() {
        return this.getSource(this.name);
      }

    }
  }
</script>