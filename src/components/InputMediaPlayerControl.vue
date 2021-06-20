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
          <label for="select-clip">
            Clip:
          </label>
        </b-col>
        <b-col sm="6">
          <b-input-group ref="select-clip">
            <!-- Selector -->
            <b-form-select 
              :value="clip" 
              :options="clipOptions" 
              @change="onClipChange"
            >
              <!--No signal option-->
              <template #first>
                <b-form-select-option :value="null">
                  No clip
                </b-form-select-option>
              </template>

            </b-form-select>

            <!-- Remove -->
            <b-input-group-append>
              <b-button variant="outline-danger" @click="onDeleteClip">
                -
              </b-button>
            </b-input-group-append>

            <!-- Add -->
            <b-input-group-append>
              <b-button variant="outline-success" v-b-modal="'input-media-player-add-clip'">
                +
              </b-button>
            </b-input-group-append>

          </b-input-group>
        </b-col>
      </b-row>

      <!-- Controls -->
      <b-row class="my-1">
        <b-col sm="12">
          <b-input-group>
            <!-- State select -->
            <ClipStateSelect
              :disabled="disabled"
              :value="state"
              @change="onStateChange"
            />

            <!-- Repeat select  -->
            <ClipRepeatSelect
              :disabled="disabled"
              :value="repeat"
              @change="onRepeatChange"
            />
    
            <!-- Play speed -->
            <b-input-group-prepend is-text>
              Play speed
            </b-input-group-prepend>
            <b-form-input 
              type="number"
              step="0.001"
              :disabled="disabled"
              :value="speed"
              @change="onSpeedChange"
            />


          </b-input-group>
        </b-col>

      </b-row>

      <!-- Progress bar -->
      <b-row class="my-1">
        <b-col sm="12">
          <b-form-input 
            type="range"
            min="0"
            max="1"
            step="0.001"
            :disabled="disabled"
            :value="progress"
            @input="onProgressInput"
          />

          {{time}}s / {{duration}}s
        </b-col>

      </b-row>

    </b-container>

    <!-- Add clip modal -->
    <InputMediaPlayerAddClipModal :name="name" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import InputMediaPlayerAddClipModal from './InputMediaPlayerAddClipModal'
  import ClipStateSelect from './ClipStateSelect'
  import ClipRepeatSelect from './ClipRepeatSelect'

  export default {
    name: 'InputMediaPlayerControl',
    components: {
      ClipStateSelect,
      ClipRepeatSelect,
      InputMediaPlayerAddClipModal
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {
        timeFetchIntervalId: null
      };
    },
    mounted() {
      console.assert(this.timeFetchIntervalId === null);

      //Periodically fetch the time of the clip
      this.timeFetchIntervalId = setInterval(() => {
        if(this.clip && this.state === 'playing') {
          this.$store.dispatch('inputMediaPlayer/fetchClipTime', { name: this.name, clip: this.clip });
        }
      }, 500);
    },
    destroyed() {
      console.assert(this.timeFetchIntervalId);
      clearInterval(this.timeFetchIntervalId);
      this.timeFetchIntervalId = null;
    },

    methods: {
      onDelete() {
        this.$router.push({ name: 'home' }); //FIXME this should be done on the commit, when it actually gets deleted
        this.$store.dispatch('inputMediaPlayer/delete', this.name);
      },

      onClipChange(value) {
        this.$store.dispatch('inputMediaPlayer/setCurrentClip', { name: this.name, value: value });
      },
      onDeleteClip() {
        if(this.clip) {
          this.$store.dispatch('inputMediaPlayer/deleteClip', { name: this.name, clip: this.clip });
        }
      },

      onStateChange(value) {
        if(this.clip) {
          this.$store.dispatch('inputMediaPlayer/setClipState', { name: this.name, clip: this.clip, value: value });
        }
      },
      onRepeatChange(value) {
        if(this.clip) {
          this.$store.dispatch('inputMediaPlayer/setClipRepeat', { name: this.name, clip: this.clip, value: value });
        }
      },
      onSpeedChange(value) {
        if(this.clip) {
          this.$store.dispatch('inputMediaPlayer/setClipSpeed', { name: this.name, clip: this.clip, value: value });
        }
      },

      onProgressInput(value) {
        if(this.clip) {
          const time = value*this.duration;
          this.$store.dispatch('inputMediaPlayer/setClipTime', { name: this.name, clip: this.clip, value: time });
        }
      }

    },
    computed: {
      ...mapGetters('inputMediaPlayer', [ 
        'getClips',
        'getCurrentClip',
        'getClipState',
        'getClipRepeat',
        'getClipSpeed',
        'getClipDuration',
        'getClipTime',
 
      ]),

      clipOptions() {
        const clips = this.getClips(this.name)
        return clips.map(clip => {
          return { value: clip, text: clip };
        });
      },
      clip() {
        return this.getCurrentClip(this.name);
      },


      state() {
        let result = "paused";

        if(this.clip) {
          result = this.getClipState(this.name, this.clip);
        }

        return result;
      },
      repeat() {
        let result = null;

        if(this.clip) {
          result = this.getClipRepeat(this.name, this.clip);
        }

        return result;
      },
      speed() {
        let result = 1.0;

        if(this.clip) {
          result = this.getClipSpeed(this.name, this.clip);
        }

        return result;
      },


      duration() {
        let result = 0.0;

        if(this.clip) {
          result = this.getClipDuration(this.name, this.clip);
        }

        return result;
      },
      time() {
        let result = 0.0;

        if(this.clip) {
          result = this.getClipTime(this.name, this.clip);
        }

        return result;
      },
      progress() {
        let result = 0.0;

        if(this.duration) {
          result = this.time / this.duration;
        }

        return result;
      },

      disabled() {
        return !this.clip;
      }

    }
  }
</script>