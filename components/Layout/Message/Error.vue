<template>
  <div class="message error-message">
    {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    message: {
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
// .opacity {
//   &-enter,
//   &-leave-to {
//     opacity: 0 !important;
//   }
//   &-enter-active,
//   &-leave-active {
//     transition: all 0.1s ease !important;
//   }
// }
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(200, 50, 50);
  border-radius: 15px;
  color: white;
  overflow: hidden;
  transition: 1s;
  padding: 5px;
  height:auto;
  text-align: left;
}
</style>
