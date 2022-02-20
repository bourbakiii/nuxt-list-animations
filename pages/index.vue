<template>
  <div class="page index-page">
    <Product
      :key="product.id"
      :product="product"
      v-for="product in products"
      :inCart="!!product.pivot.count"
      @remove="remove(product)"
      @decrease="decrease(product)"
      @crease="crease(product)"
    />
    <LayoutModalsProduct />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  async asyncData({ $axios }) {
    let products = [];
    let loading = true;
    await $axios
      .get("/products")
      .then(({ data }) => {
        data.forEach((element) => {
          Object.assign(element, {
            name: element.title,
            stock: 100,
            step: 1,
            pivot: {
              count: 0,
            },
            is_favourite: false
          });
          delete element.title;
        });
        products = data;
      })
      .finally(() => {
        loading = false;
      });
    // !_! Вывод ошибки
    // .catch(json=>console.log(json))
    return { products, loading };
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    remove(product) {
      product.pivot.count = 0;
    },
    crease(product) {
      product.pivot.count = Math.min(++product.pivot.count, product.stock);
    },
    decrease(product) {
      product.pivot.count = Math.max(--product.pivot.count, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  @media screen and (max-width: $note) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 11px;
  }
  @media screen and (max-width: $tablet) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
  }
  @media screen and (max-width: $startmobile) {
    grid-template-columns: repeat(2, 1fr);
  }
  .product {
    animation: scaled 1s forwards;
    @keyframes scaled {
      0% {
        transform: scale(0.7);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>
