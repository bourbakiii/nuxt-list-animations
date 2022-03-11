<template>
  <transition v-if='show' name="opacity">
      {{show}}
    <slot></slot>
  </transition>
</template>
<script>
export default {
    props: {
        show:{
            required: true,
            default: true
        }
    }
}
</script>