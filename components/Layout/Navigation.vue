<template>
  <div class="wrapper">
    <div class="content">
      <NuxtLink to="/" class="link bebas unselectable volume">Bourbaki</NuxtLink>
      <div class="icons">
      <NuxtLink to="/basket" class="icon link bebas unselectable volume"><IconsBasket scale='1.08'/><span class="basket-count"></span></NuxtLink>
      <NuxtLink v-if='token' to="/profile" class="icon link bebas unselectable volume"><IconsProfile scale='1.08'/></NuxtLink>
      <button @click="$store.commit('modals/open',{modal_name:'login'})" class="icon link bebas unselectable volume"><IconsEnter scale='1.19'/></button>
      </div>
    </div>
    <LayoutModalsLogin />
  </div>
</template>

<script>
export default {
  computed:{
    token(){
      return this.$store.state.account.token;
    }
  }
};
</script>

<style lang='scss' scoped>
.wrapper {
  width: 100%;
  max-width:100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $black;
  font-family: "Bebas";
  padding: 0px 10px;
  .content {
    width: 100%;
    height: 100%;
    max-width: $maxwidth;

    .link {
      font-size: 27px;
      transition: 0.1s;
      color:$white;
      fill:white;
      &:hover {
        opacity: 0.9;
      }
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
     .nuxt-link-exact-active{
        color:$selection_color;
        fill:$selection_color;
      }
    
    .icons{
      display: flex;align-items: center;justify-content: center;
      button{
        background-color: transparent; border:none; outline:none;
      }
      .icon:first-of-type{
        margin-right: 10px;
      }
      
    }
  }
}
</style>