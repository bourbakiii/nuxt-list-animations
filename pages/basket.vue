<template>
  <div class="page basket-page">
    <transition name="switch" appear>
      <div v-if="basket_products.length" class="products">
        <transition-group name="product-switch" appear>
          <ProductBasket
            v-for="product in basket_products"
            :product="product"
            :key="product.id"
          />
        </transition-group>
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

.product-switch{
  &-enter, &-leave-to{
    opacity:0;
    transform: translateX(-80px);
  }
  &-enter-active, &-leave-active{
    transition: all 0.3s ease;
  }
  &-move{
    position: absolute;
    transition: all 0.3 ease;
  }
}

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
