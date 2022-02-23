<template>
  <div @click.self='open_product_modal(product)' class="basket-product product">
    <img @click='open_product_modal(product)' :src="product.image" alt="Product Image" class="image" />
    <div @click='open_product_modal(product)' class="middle-content">
      <p class="name">{{ product.name }}</p>
      <span class="prices">
        <p class="price">{{ price }}<IconsRouble scale="0.72" /></p>
        <p v-if="!!!full_price" class="full-price">
          {{ full_price }}1000<IconsRouble scale="0.56" />
        </p>
      </span>
    </div>
    <div @click.self='open_product_modal(product)' class="buttons">
      <button @click="remove" class="remove pushable-button"><IconsClose scale='1.2' /></button>
      <button @click="decrease" class="decrease pushable-button"><IconsMinus scale='1.2' /></button>
      <p class="count">{{product.pivot.count}}</p>
      <button @click='crease' class="crease pushable-button"><IconsPlus  scale='1.2'/></button>
      <button
          :class="{ active: product.is_favourite }"
          @click="add_favourite"
          class="heart pushable-button"
        >
          <IconsHeart />
        </button>
    </div>
  </div>
</template>

<script>
import product_modal from "@/mixins/product_modal.js";
export default {
  mixins:[product_modal],
  props: {
    product: {
      required: true,
    },
  },
  methods: {
    add_favourite(){
      this.$store.commit("favourites/toggle", this.product);
    },
    remove() {
      this.$store.commit("basket/remove", this.product);
    },
    crease() {
      this.$store.commit("basket/crease", this.product);
    },
    decrease() {
      this.$store.commit("basket/decrease", this.product);
    },
  },
  computed: {
    price() {
      return this.product.discount_price ?? this.product.price;
    },
    full_price() {
      return this.product.discount_price ? this.product.price : null;
    },
    count() {
      return this.product.pivot.count * this.product.step ?? this.product.step;
    },
  },
};
</script>

<style lang='scss' scoped>
.basket-product {
  width: 100%;
  height: auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 15px;
  flex-shrink: 0;
  min-height: 120px;
  margin-bottom: 10px;
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 0px;
  }
  .image {
    width: 100px;
    max-height: 100px;
    margin-right: 5%;
    object-fit: contain;
  }
  .middle-content {
    flex-grow: 1;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    .name {
      text-align: left;
      width: 100%;
    }
    .prices {
      margin-top: 10px;
      width: max-content;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      .full-price {
        margin-left: 20px;
        width: max-content;
        font-size: 16px;
        color: black;
        opacity: 0.4;
        fill: black;
        &::before {
          position: absolute;
          top: 50%;
          left: 0px;
          width: 100%;
          height: 1px;
          content: "";
          background-color: black;
        }
      }
    }
  }
  .buttons{
    flex-shrink: 0;
    display: flex;align-items: center;justify-content: center;
    .heart {
      transition: 0.2s;
      fill: rgba(0, 0, 0, 0.4);
      svg {
        animation: disactivate 0.2s forwards;
        @keyframes disactivate {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.85);
          }
          100% {
            transform: scale(1);
          }
        }
      }
      margin-left: 10px;
      justify-self: flex-start;
      &.active {
        svg {
          animation: activate 0.2s forwards;
          @keyframes activate {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.15);
            }
            100% {
              fill: $red;
              transform: scale(1);
            }
          }
          fill: $red;
        }
      }
    }
    .pushable-button{
      width:40px;
      height:40px;
      
      &.remove{
        margin-right:10px;
      }
    }
    .count{
      margin:0px 10px;
    }
  }
}

.button-appear-appear {
  transform: rotate(-200deg);
}
.button-appear-appear-active {
  transition: all 1s;
}
.button-appear-leave-to {
  transform: scale(0);
}

.button-appear-enter-active {
  animation: button_appear 0.3s forwards;
  @keyframes button_appear {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
.button-appear-leave-active {
  animation: button_appear 0.3s forwards reverse;
}
.show-enter {
  opacity: 0;
  transform: translateY(-10px);
}
.show-enter-to {
  transition: all 0.2s ease;
}
.show-leave-to {
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(10px);
}
</style>