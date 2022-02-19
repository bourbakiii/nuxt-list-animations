<template>
  <div v-if='$store.state.modals.product.show==true' class="modal-product wrapper">
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.wrapper{
    width:100%;
    height:100%;
    position: fixed;top:0px;left:0px;
    display: flex;align-items: center;justify-content: flex-start;
    padding-top: 20vh;
    background-color: rgba(0,0,0,.3);
    overflow: hidden;
}
</style>