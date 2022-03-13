<template>
  <input
      type="range"
      min="0"
      max="50"
      step="0.25"
      :value="value"
      class="progress"
      @input="addPixelTo"
    />
</template>

<script>
export default {
    props: {
        variable:{
            required: true,
        },
        convert:{
            required: false,
            default: null
        }
    },
    methods:{
        addPixelTo(event){
            this.variable = event.target.value + this.convert??'';
        }
    }
}
</script>

<style>

</style>