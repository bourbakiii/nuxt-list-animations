<template>
  <div class="wrapper">
    <div class="content">
      <NuxtLink to="/" class="link bebas unselectable volume">Placeholder</NuxtLink>
      <div class="links">
        <NuxtLink to='/underline' class="link bebas unselectable volume">UNDERLINE</NuxtLink>
        <NuxtLink to='/button' class="link bebas unselectable volume">BUTTON</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.wrapper {
  width: 100vw;
  max-width:100vw;
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
      &:hover {
        opacity: 0.9;
      }
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
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