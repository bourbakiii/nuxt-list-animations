<template>
  <div class="page index-page">
    <Product
      :key="product.id"
      :product="product"
      v-for="product in products"
      :inCart="product.pivot.count"
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
  async fetch() {
    this.products = [];
    this.loading = true;
    await this.$axios
      .get("/products", {
        params: {
          limit: 20,
        },
      })
      .then(({ data }) => {
        data.forEach((element) => {
          Object.assign(element, {
            name: element.title,
            stock: 100,
            step: 1,
            pivot: {
              count: 0,
            },
            is_favourite: false,
          });
          delete element.title;
        });
        this.products = data;
      })
      // TODO !_! Вывод ошибки
      // .catch(json=>console.log(json))
      .finally(() => {
        this.loading = false;
      });
    return this.products, this.loading;
  },
  fetchOnServer: false,
  data() {
    return {
      products: [],
      loading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(250px, 1fr));
  grid-gap: 10px;
  @media screen and (max-width: $note) {
    grid-template-columns: repeat(auto-fit, minMax(220px, 1fr));
  }
  @media screen and (max-width: $tablet) {
    grid-template-columns: repeat(auto-fit, minMax(145px, 1fr));
  }
  @media screen and (max-width: $startmobile) {
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
