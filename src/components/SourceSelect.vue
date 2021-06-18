<template>
  <div>

    <b-form-select :value="value" :options="options" @change="onChange">
      <!--No signal option-->
      <template #first>
        <b-form-select-option :value="null">
          No signal
        </b-form-select-option>
      </template>

    </b-form-select>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "SourceSelect",
    components: {},
    props: {
      name: { type: String, required: true },
      input: { type: String, required: true },
    },
    data() {
      return {};
    },
    methods: {
      onChange(value) {
        //FIXME This is set on change, if set onInput, it crashes
        if(value) {
          this.$store.dispatch('mixer/connect', {
            dstElement: this.name,
            dstInput: this.input,
            srcElement: value.element,
            srcOutput: value.output
          });
        } else {
          this.$store.dispatch('mixer/disconnect', {
            dstElement: this.name,
            dstInput: this.input
          });
        }
      }
    },
    computed: {
      ...mapGetters('mixer', [ 
        'getOutputs',
        'getSource'
      ]),

      options() {
        const outputs = this.getOutputs;
        return outputs.map(output => {
          return { value: output, text: output.element + ' - ' + output.output };
        });
      },
      value() {
        let result = this.getSource(this.name, this.input);

        //Avoid undefined-like values
        if(!result) {
          result = null;
        }

        return result;
      }
    }
  };
</script>