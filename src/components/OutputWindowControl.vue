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
          <SourceSelect
            ref="select-source" 
            :name="name"
            :input="'videoIn'"
          />
        </b-col>
      </b-row>

      <!-- Scaling mode -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-scaling-mode">
            Video scaling mode:
          </label>
        </b-col>
        <b-col sm="6">
          <ScalingModeSelect 
            ref="select-scaling-mode"
            :value="scalingMode"
            @change="onScalingModeChange"
          />
        </b-col>
      </b-row>

      <!-- Scaling filter -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-scaling-filter">
            Video scaling filter:
          </label>
        </b-col>
        <b-col sm="6">
          <ScalingFilterSelect
            ref="select-scaling-filter"
            :value="scalingFilter"
            @change="onScalingFilterChange"
          />
        </b-col>
      </b-row> 

      <!-- Title -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-title">
            Title:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-input 
            ref="input-title" 
            :value="title"
            @change="onTitleChange"
          />
        </b-col>
      </b-row>

      <!-- Size -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-size">
            Size:
          </label>
        </b-col>
        <b-col sm="6">
          <VectorInput
            ref="input-size"
            :value="size"
            @change="onSizeCahnge"
          />
        </b-col>
      </b-row>

      <!-- Position -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-position">
            Position:
          </label>
        </b-col>
        <b-col sm="6">
          <VectorInput
            ref="input-position"
            :value="position"
            @change="onPositionChange"
          />
        </b-col>
      </b-row>

      <!-- Opacity -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="input-opacity">
            Opacity:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-input 
            ref="input-opacity"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="opacity"
            @change="onOpacityChange"
          />
        </b-col>
      </b-row>

      <!-- Decorated -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="check-decorated">
            Decorated:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-checkbox switch
            ref="check-decorated"
            :checked="decorated"
            @change="onDecoratedChange"
          />
        </b-col>
      </b-row>

      <!-- Resizable -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="check-resizable">
            Resizable:
          </label>
        </b-col>
        <b-col sm="6">
          <b-form-checkbox switch
            ref="check-resizable"
            :checked="resizable"
            @change="onResizableChange"
          />
        </b-col>
      </b-row>

      <!-- Monitor -->
      <b-row class="my-1">
        <b-col sm="6">
          <label for="select-monitor">
            Monitor:
          </label>
        </b-col>
        <b-col sm="6">
          <b-input-group ref="select-monitor">
            <!-- Selector -->
            <b-form-select 
              :value="monitor" 
              :options="monitorOptions" 
              @change="onMonitorChange"
            >
              <!--No monitor option-->
              <template #first>
                <b-form-select-option :value="null">
                  No monitor
                </b-form-select-option>
              </template>

            </b-form-select>

            <b-input-group-append>
              <b-button variant="outline-success" @click="onRefreshMonitors">
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

  import SourceSelect from './SourceSelect'
  import ScalingModeSelect from './ScalingModeSelect' 
  import ScalingFilterSelect from './ScalingFilterSelect' 
  import VectorInput from './VectorInput' 
  import VideoModeConfigure from './VideoModeConfigure' 

  export default {
    name: 'OutputWindowControl',
    components: {
      SourceSelect,
      ScalingModeSelect,
      ScalingFilterSelect,
      VideoModeConfigure,
      VectorInput,
      
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
        this.$store.dispatch('outputWindow/delete', this.name);
      },

      onRefreshMonitors() {
        this.$store.dispatch('outputWindow/fetchMonitors', this.name);
      },

      onScalingModeChange(value) {
        this.$store.dispatch('outputWindow/setScalingMode', { name: this.name, value: value });
      },
      onScalingFilterChange(value) {
        this.$store.dispatch('outputWindow/setScalingFilter', { name: this.name, value: value });
      },
      onTitleChange(value) {
        if(value.length > 0) {
          this.$store.dispatch('outputWindow/setTitle', { name: this.name, value: value });
        }
      },
      onSizeCahnge(value) {
        if(value) {
          this.$store.dispatch('outputWindow/setSize', { name: this.name, value: value });
        }
      },
      onPositionChange(value) {
        if(value) {
          this.$store.dispatch('outputWindow/setPosition', { name: this.name, value: value });
        }
      },
      onOpacityChange(value) {
        this.$store.dispatch('outputWindow/setOpacity', { name: this.name, value: value });
      },
      onResizableChange(value) {
        this.$store.dispatch('outputWindow/setResizable', { name: this.name, value: value });
      },
      onDecoratedChange(value) {
        this.$store.dispatch('outputWindow/setDecorated', { name: this.name, value: value });
      },
      onMonitorChange(value) {
        this.$store.dispatch('outputWindow/setCurrentMonitor', { name: this.name, value: value });
      }

    },
    computed: {
      ...mapGetters('outputWindow', [ 
        'getScalingMode',
        'getScalingFilter',
        'getTitle',
        'getSize',
        'getPosition',
        'getOpacity',
        'getResizable',
        'getDecorated',
        'getMonitors',
        'getCurrentMonitor',
 
      ]),

      scalingMode(){
        return this.getScalingMode(this.name);
      },
      scalingFilter(){
        return this.getScalingFilter(this.name);
      },
      title(){
        return this.getTitle(this.name);
      },
      size(){
        return this.getSize(this.name);
      },
      position(){
        return this.getPosition(this.name);
      },
      opacity() {
        return this.getOpacity(this.name);
      },
      resizable() {
        return this.getResizable(this.name);
      },
      decorated() {
        return this.getDecorated(this.name);
      },
      monitorOptions() {
        const monitors = this.getMonitors(this.name)
        return monitors.map(monitor => {
          return { value: monitor, text: monitor };
        });
      },
      monitor() {
        return this.getCurrentMonitor(this.name);
      }

    }
  }
</script>