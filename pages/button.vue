<template>
  <div class="page button-page">
      <button @mouseleave="unhover" @mouseenter="hover" class="hover-button">HOVER ME</button>
  </div>
</template>

<script>
export default {
  name: "ButtonPage",
  methods:{
      created(){
          const elements = document.querySelectorAll('hover-button');
          elements.forEach();
      },
      hover(event){
          const element = event.target;
          const circle = document.createElement('div');
          circle.classList.add('growing');
          circle.innerHTML = 'SOME TEXT';
          element.appendChild(circle)
          console.log('hover');
      },
      unhover(){
          console.log('unhover');
      }
  }
};
</script>
<style lang="scss" scoped>
.page{
.hover-button{
    width:90%;
    height:83vh;
}
}

</style>
