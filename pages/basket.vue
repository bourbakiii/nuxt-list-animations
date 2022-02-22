<template>
  <div class="page baket-page">
      <div class="products">
        <ProductBasket v-for='product in basket_products' :product='product' :key='product.id'/>
      </div>
  </div>
</template>

<script>
export default {
  name: "BasketPage",
  computed:{
    basket_products(){
      return this.$store.state.basket.products;
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  flex-grow: 1;
}
</style>
