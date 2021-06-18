<template>
  <div>
    <b-container fluid>
      <!-- Position -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-position">
            Position:
          </label>
        </b-col>
        <b-col sm="9">
          <VectorInput 
              ref="input-position"
          />
        </b-col>
      </b-row>

      <!-- Rotation -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-rotation">
            Rotation:
          </label>
        </b-col>
        <b-col sm="9">
          <VectorInput 
              ref="input-rotation"
          />
        </b-col>
      </b-row>

      <!-- Scale -->
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-scale">
            Rotation:
          </label>
        </b-col>
        <b-col sm="9">
          <VectorInput 
              ref="input-scale"
          />
        </b-col>
      </b-row>

    </b-container>




    <h3> TODO: {{ type.toUpperCase() }} Keyer {{ num }} </h3>

  </div>
</template>

<script>
  import VectorInput from './VectorInput'

  export default {
    name: "MixEffectKeyer",
    components: {
      VectorInput
    },
    props: {
      mixEffect: { type: String, required: true },
      type: { type: String, required: true },
      num: { type: Number, required: true }
    },
    data() {
      return {};
    },
    methods: {},
    computed: {}
  };
</script>