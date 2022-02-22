<template>
  <div class="wrapper">
    <div class="content">
      <NuxtLink to="/" class="link bebas unselectable volume">Placeholder</NuxtLink>
      <NuxtLink to="/basket" class="link bebas unselectable volume"><IconsBasket scale='1.08'/><span class="basket-count"></span></NuxtLink>
    </div>
  </div>
</template>

<script>
export default {};
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
    .links {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .link{
        margin-right:5px;
        &:last-of-type{
          margin-right:0px;
        }
      }
    }
  }
}
</style>