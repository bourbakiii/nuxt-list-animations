<template>
  <div class="page index-page">
    <div class="product" v-for="product in products" :key="product.id">
      <p class="name lefted">
        {{ product.name }}
      </p>
      <div class="buttons">
          <div v-if="product.count > 0" class="crease-buttons">
            <button @click="remove(product)" class="animated crease decrease">x</button>
            <button @click="decrease(product)" class="animated crease decrease">
              -
            </button>
            <p class="animated count">{{ product.count }}</p>
            <button @click="crease(product)" class="crease">+</button>
          </div>
          <button v-else @click="crease(product)" class="crease add-button">
            +
          </button>
      </div>
    </div>
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
          name: "Product№1",
          stock: 5,
          count: 0,
        },
      ],
    };
  },
  methods: {
    remove(product) {
      this.$store.commit("basket/remove", product);
    },
    crease(product) {
      this.$store.commit("basket/crease", product);
    },
    decrease(product) {
      this.$store.commit("basket/decrease", product);
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  .product {
    width: 100%;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border: 1px solid rgba($black, 0.3);
    height: 200px;
    .name {
      width: 100%;
      flex-grow: 1;
    }
    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      align-self: flex-end;
      height: 35px;
      width: max-content;
      .animated {
        animation: show 0.4s forwards;
        @keyframes show {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
      button {
        background-color: transparent;
        outline: none;
        border: none;
        height: 100%;
        font-size: 18px;
        border: 1px solid black;
      }
      .add-button {
        border-radius: 90px;
        width: 100%;
        width: 35px;
      }
      .crease-buttons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .count {
          margin: 0px 10px;
        }
        button {
          border-radius: 90px;
          width: 100%;
          width: 35px;
        }
      }
    }
  }
}
</style>
