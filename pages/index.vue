<template>
  <div class="page index-page">
    <Product v-for='product in products' :inCart='!!product.pivot.count' @remove='remove(product)' @decrease='decrease(product)' @crease='crease(product)' :key='product.id' :product='product' />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      products: [
        {
          id: 1,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{
            count:1
          },
          is_active: true
        },
        {
          id: 2,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:2},
          is_active: true
        },
        {
          id: 3,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 4,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:3},
          is_active: true
        },
        {
          id: 5,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 6,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 7,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 8,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 9,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 10,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 11,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
        {
          id: 12,
          name:'Product #1000000000000000000000000000001',
          price:400,
          discount_price:200,
          step: 0.1,
          stock: 10,
          pivot:{count:0},
          is_active: true
        },
      ],
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
      product.pivot.count = --product.pivot.count;
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap:20px;
  @media screen and (max-width:$note) {
  grid-template-columns: repeat(4, 1fr);
  grid-gap:11px;
  }
  @media screen and (max-width:$tablet) {
  grid-template-columns: repeat(3, 1fr);
  grid-gap:8px;
  }
  @media screen and (max-width:$startmobile) {
  grid-template-columns: repeat(2, 1fr);
  }
}
</style>
