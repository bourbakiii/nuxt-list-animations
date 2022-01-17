<template>
  <div class="animation-list">
    <h1 class="bebas title standart-title lefted">Все анимации</h1>
    <div class="content">
        <NuxtLink @click.native='selectAnimation("todo")' to='/animation' class='link'>Список</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    selectAnimation(animation_name){
      this.$store.commit('animations/select_animation', animation_name);
    }
  }
};
</script>

<style lang="scss" scoped>
.animation-list {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
    .title{
        margin: 10px 0px;
    }
  .content{
      display: grid;
      border:2px solid $black;
      width:100%; padding:10px;
      border-radius: 15px;
      .link{
          font-size: 20px;
      }
  }
}
</style>