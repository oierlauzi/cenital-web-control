<template>
  <div>
    <b-container fluid="sm">
      <!-- Frame Rate -->
      <b-row class="my-1" v-if="showFrameRate">
        <b-col sm="6">
          <label for="input-frame-rate">
            Frame rate:
          </label>
        </b-col>
        <b-col sm="6">
          <RationalInput
            ref="input-frame-rate"
            :value="frameRate"
            :disabled="ronlyFrameRate"
            @change="onFrameRateChange"
          />
        </b-col>
      </b-row>

      <!-- Resolution -->
      <b-row class="my-1" v-if="showResolution">
        <b-col sm="6">
          <label for="input-resolution">
            Resolution:
          </label>
        </b-col>
        <b-col sm="6">
          <ResolutionInput
            ref="input-resolution"
            :value="resolution"
            :disabled="ronlyResolution"
            @change="onResolutionChange"
          />
        </b-col>
      </b-row>

      <!-- Pixel Aspect Ratio -->
      <b-row class="my-1" v-if="showPixelAspectRatio">
        <b-col sm="6">
          <label for="input-pixel-aspect-ratio">
            Pixel aspect ratio:
          </label>
        </b-col>
        <b-col sm="6">
          <RationalInput
            ref="input-pixel-aspect-ratio"
            :value="pixelAspectRatio"
            :disabled="ronlyPixelAspectRatio"
            @change="onPixelAspectRatioChange"
          />
        </b-col>
      </b-row>

      <!-- Color primaries -->
      <b-row class="my-1" v-if="showColorPrimaries">
        <b-col sm="6">
          <label for="select-color-primaries">
            Color primaries:
          </label>
        </b-col>
        <b-col sm="6">
          <b-select
            ref="select-color-primaries"
            :value="colorPrimaries"
            :options="colorPrimariesOptions"
            :disabled="ronlyColorPrimaries"
            @change="onColorPrimariesChange"
          />
        </b-col>
      </b-row>

      <!-- Color model -->
      <b-row class="my-1" v-if="showColorModel">
        <b-col sm="6">
          <label for="select-color-model">
            Color model:
          </label>
        </b-col>
        <b-col sm="6">
          <b-select
            ref="select-color-model"
            :value="colorModel"
            :options="colorModelOptions"
            :disabled="ronlyColorModel"
            @change="onColorModelChange"
          />
        </b-col>
      </b-row>

      <!-- Color transfer function -->
      <b-row class="my-1" v-if="showColorTransferFunction">
        <b-col sm="6">
          <label for="select-color-transfer-function">
            Color transfer function:
          </label>
        </b-col>
        <b-col sm="6">
          <b-select
            ref="select-color-transfer-function"
            :value="colorTransferFunction"
            :options="colorTransferFunctionOptions"
            :disabled="ronlyColorTransferFunction"
            @change="onColorTransferFunctionChange"
          />
        </b-col>
      </b-row>

      <!-- Color subsampling -->
      <b-row class="my-1" v-if="showColorSubsampling">
        <b-col sm="6">
          <label for="select-color-subsampling">
            Color subsampling:
          </label>
        </b-col>
        <b-col sm="6">
          <b-select
            ref="select-color-subsampling"
            :value="colorSubsampling"
            :options="colorSubsamplingOptions"
            :disabled="ronlyColorSubsampling"
            @change="onColorSubsamplingChange"
          />
        </b-col>
      </b-row>

      <!-- Color range -->
      <b-row class="my-1" v-if="showColorRange">
        <b-col sm="6">
          <label for="select-color-range">
            Color range:
          </label>
        </b-col>
        <b-col sm="6">
          <b-select
            ref="select-color-range"
            :value="colorRange"
            :options="colorRangeOptions"
            :disabled="ronlyColorRange"
            @change="onColorRangeChange"
          />
        </b-col>
      </b-row>

      <!-- Color format -->
      <b-row class="my-1" v-if="showColorFormat">
        <b-col sm="6">
          <label for="select-color-format">
            Color format:
          </label>
        </b-col>
        <b-col sm="6">
          <b-select
            ref="select-color-format"
            :value="colorFormat"
            :options="colorFormatOptions"
            :disabled="ronlyColorFormat"
            @change="onColorFormatChange"
          />
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import RationalInput from './RationalInput'
  import ResolutionInput from './ResolutionInput'

  export default {
    name: "VideoModeSettings",
    components: {
      RationalInput,
      ResolutionInput,
    },
    props: {
      name: { type: String, required: true }
    },
    data() {
      return {};
    },
    methods: {
      onFrameRateChange(value) {
        if(value) {
          this.$store.dispatch('mixer/setFrameRate', { name: this.name, value: value })
          .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
        }
      },
      onResolutionChange(value) {
        if(value) {
          this.$store.dispatch('mixer/setResolution', { name: this.name, value: value })
          .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
        }
      },
      onPixelAspectRatioChange(value) {
        if(value) {
          this.$store.dispatch('mixer/setPixelAspectRatio', { name: this.name, value: value })
          .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
        }
      },
      onColorPrimariesChange(value) {
        this.$store.dispatch('mixer/setColorPrimaries', { name: this.name, value: value })
        .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
      },
      onColorModelChange(value) {
        this.$store.dispatch('mixer/setColorModel', { name: this.name, value: value })
        .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
      },
      onColorTransferFunctionChange(value) {
        this.$store.dispatch('mixer/setColorTransferFunction', { name: this.name, value: value })
        .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
      },
      onColorSubsamplingChange(value) {
        this.$store.dispatch('mixer/setColorSubsampling', { name: this.name, value: value })
        .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
      },
      onColorRangeChange(value) {
        this.$store.dispatch('mixer/setColorRange', { name: this.name, value: value })
        .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
      },
      onColorFormatChange(value) {
        this.$store.dispatch('mixer/setColorFormat', { name: this.name, value: value })
        .then(() => this.$store.dispatch('mixer/fetchVideoMode', this.name)); //Options might change
      }

    },
    computed: {
      ...mapGetters("mixer", [ 
        'getFrameRateReadable',
        'getFrameRateWritable',
        'getFrameRateValue',
        'getResolutionReadable',
        'getResolutionWritable',
        'getResolutionValue',
        'getPixelAspectRatioReadable',
        'getPixelAspectRatioWritable',
        'getPixelAspectRatioValue',
        'getColorPrimariesOptions',
        'getColorPrimariesReadable',
        'getColorPrimariesWritable',
        'getColorPrimariesValue',
        'getColorModelOptions',
        'getColorModelReadable',
        'getColorModelWritable',
        'getColorModelValue',
        'getColorTransferFunctionOptions',
        'getColorTransferFunctionReadable',
        'getColorTransferFunctionWritable',
        'getColorTransferFunctionValue',
        'getColorSubsamplingOptions',
        'getColorSubsamplingReadable',
        'getColorSubsamplingWritable',
        'getColorSubsamplingValue',
        'getColorRangeOptions',
        'getColorRangeReadable',
        'getColorRangeWritable',
        'getColorRangeValue',
        'getColorFormatOptions',
        'getColorFormatReadable',
        'getColorFormatWritable',
        'getColorFormatValue'
      ]),

      frameRate() {
        return this.getFrameRateValue(this.name);
      },
      resolution() {
        return this.getResolutionValue(this.name);
      },
      pixelAspectRatio() {
        return this.getPixelAspectRatioValue(this.name);
      },
      colorPrimaries() {
        return this.getColorPrimariesValue(this.name);
      },
      colorModel() {
        return this.getColorModelValue(this.name);
      },
      colorTransferFunction() {
        return this.getColorTransferFunctionValue(this.name);
      },
      colorSubsampling() {
        return this.getColorSubsamplingValue(this.name);
      },
      colorRange() {
        return this.getColorRangeValue(this.name);
      },
      colorFormat() {
        return this.getColorFormatValue(this.name);
      },


      showFrameRate() {
        return this.getFrameRateReadable(this.name);
      },
      showResolution() {
        return this.getResolutionReadable(this.name);
      },
      showPixelAspectRatio() {
        return this.getPixelAspectRatioReadable(this.name);
      },
      showColorPrimaries() {
        return this.getColorPrimariesReadable(this.name);
      },
      showColorModel() {
        return this.getColorModelReadable(this.name);
      },
      showColorTransferFunction() {
        return this.getColorTransferFunctionReadable(this.name);
      },
      showColorSubsampling() {
        return this.getColorSubsamplingReadable(this.name);
      },
      showColorRange() {
        return this.getColorRangeReadable(this.name);
      },
      showColorFormat() {
        return this.getColorFormatReadable(this.name);
      },


      ronlyFrameRate() {
        return !this.getFrameRateWritable(this.name);
      },
      ronlyResolution() {
        return !this.getResolutionWritable(this.name);
      },
      ronlyPixelAspectRatio() {
        return !this.getPixelAspectRatioWritable(this.name);
      },
      ronlyColorPrimaries() {
        return !this.getColorPrimariesWritable(this.name);
      },
      ronlyColorModel() {
        return !this.getColorModelWritable(this.name);
      },
      ronlyColorTransferFunction() {
        return !this.getColorTransferFunctionWritable(this.name);
      },
      ronlyColorSubsampling() {
        return !this.getColorSubsamplingWritable(this.name);
      },
      ronlyColorRange() {
        return !this.getColorRangeWritable(this.name);
      },
      ronlyColorFormat() {
        return !this.getColorFormatWritable(this.name);
      },


      colorPrimariesOptions() {
        return this.getColorPrimariesOptions(this.name);
      },
      colorModelOptions() {
        return this.getColorModelOptions(this.name);
      },
      colorTransferFunctionOptions() {
        return this.getColorTransferFunctionOptions(this.name);
      },
      colorSubsamplingOptions() {
        return this.getColorSubsamplingOptions(this.name);
      },
      colorRangeOptions() {
        return this.getColorRangeOptions(this.name);
      },
      colorFormatOptions() {
        return this.getColorFormatOptions(this.name);
      }

    }
  };
</script>