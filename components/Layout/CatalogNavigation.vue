<template>
  <div class="catalog-navigation wrapper">
    <div class="content">
      123
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    token(){
      return this.$store.state.modules.account.token;
    }
  }
};
</script>

<style lang='scss' scoped>
.wrapper {
  position: sticky;
  height:50px;
  width:100%;
  display: flex;align-items: center;justify-content: center;
  background-color: $black;
  top:0px;
  left:0px;
  .content{
      width:100%;
      height:100%;
  }
}
</style>