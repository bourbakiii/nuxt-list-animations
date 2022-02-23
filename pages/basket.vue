<template>
  <div class="page basket-page">
    <transition name="switch" mode='out-in' appear>
      <div v-if="basket_products.length" class="products">
        <client-only>
          <ProductBasket
            v-for="product in basket_products"
            :product="product"
            :key="product.id"
          />
        </client-only>
      </div>
      <p v-else class="empty">Ваша корзина пуста</p>
    </transition>
    <LayoutModalsProduct />
  </div>
</template>

<script>
export default {
  name: "BasketPage",
  computed: {
    basket_products() {
      return this.$store.state.basket?this.$store.state.basket.products:[];
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
    transition: all 0.1s ease;
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
