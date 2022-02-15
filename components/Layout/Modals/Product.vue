<template>
  <transition name="modal">
    <div
      v-if="$store.state.modals.product.show"
      @click.self="
        $store.commit('modals/close', {
          modal_name: 'product',
        })
      "
      class="modal modals-product wrapper"
    >
      <div class="content"></div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 10px;
  padding-top: 20vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    border-radius: 17px;
    border: 1px solid rgba(black, 0.3);
    border-bottom: 10px solid rgba(black, 0.3);
    padding: 20px;
    width: 100%;
    background-color: $white;
    min-height: 500px;
    max-width: 900px;
  }
}
</style>