<template>
  <transition v-if='show' name="modal">
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