<template>
  <div class="page basket-page">
    <transition name="switch" appear>
      <div v-if="basket_products.length" class="products">
          <ProductBasket
            v-for="product in basket_products"
            :product="product"
            :key="product.id"
          />
      </div>
      <div v-else class="empty">Ваша корзина пуста</div>
    </transition>
    <LayoutModalsProduct />

  </div>
</template>

<script>
export default {
  name: "BasketPage",
  computed: {
    basket_products() {
      return this.$store.state.basket.products;
    },
  },
};
</script>

<style lang="scss" scoped>
.switch {
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: all 1s;
  }
}
.page {
  flex-grow: 1;
  .products{
    position: relative;
    .product{
      width:100%;
    }
  }
}
</style>
