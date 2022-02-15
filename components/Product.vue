<template>
  <div class="product">
    <img
      @click="
        $store.commit('modals/open', {
          modal_name: 'product',
          product: product,
        })
      "
      src="@/assets/images/product.jpg"
      class="image"
    />
    <transition name="button-appear">
      <button
        @click="product.pivot.count = 0"
        class="pushable-button delete"
        v-if="product.pivot.count"
      >
        <IconsClose />
      </button>
    </transition>
    <p class="name">{{ product.name }}</p>
    <div class="main-row">
      <span class="prices">
        <p v-if="full_price" class="full-price">
          {{ full_price.toFixed(2) }}<IconsRouble scale="0.4" />
        </p>
        <p class="price">{{ price.toFixed(2) }}<IconsRouble scale="0.53" /></p>
      </span>
      <p class="weight">400гр.</p>
    </div>
    <div class="buttons">
      <transition name="button-appear">
        <button
          :class="{ active: product.is_favourite }"
          @click="product.is_favourite = !product.is_favourite"
          class="heart pushable-button"
        >
          <IconsHeart />
        </button>
      </transition>
      <transition name="show">
        <button
          v-if="inCart"
          class="crease decrease pushable-button"
          @click="decrease"
        >
          <IconsMinus fill="rgba(0,0,0,.5)" />
        </button>
      </transition>
      <transition name="show" appear>
        <p v-if="inCart" class="count">{{ count.toFixed(2) }}</p>
      </transition>
      <button class="add pushable-button" @click="crease">
        <IconsPlus fill="rgba(0,0,0,.5)" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
    },
    inCart: {
      require: true,
      default: false,
    },
  },
  methods: {
    crease() {
      this.$emit("crease");
    },
    decrease() {
      this.$emit("decrease");
    },
    remove() {
      this.$emit("remove");
    },
  },
  computed: {
    price() {
      return this.product.discount_price ?? this.product.price;
    },
    full_price() {
      return this.product.price;
    },
    count() {
      return this.product.pivot.count * this.product.step ?? this.product.step;
    },
  },
};
</script>

<style lang='scss' scoped>
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
* {
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
}
.product {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 0.1px solid rgba(white, 0.1);
  background-color: white;
  padding: 7px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid rgba(black, 0.05);
  transition: background 0.1s;
  box-shadow: 0px 0px 10px 0.1px black;
  .delete {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .image {
    cursor: pointer;
    border-radius: 15px;
    width: 100%;
    object-fit: contain;
      transition: transform 0.2s;
    &:active{
      transform: scale(0.95);
    }
  }
  .name {
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    height: 60%;
    margin: 10px;
    @media screen and (max-width: 425px) {
      font-size: 16px;
    }
  }
  .main-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    .prices {
      width: max-content;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      white-space: nowrap;
      .full-price {
        font-size: 12px;
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
    .weight {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: rgba(0, 0, 0, 0.4);
      font-size: 14px;
    }
  }
  .pushable-button{
      width: 30px;
    height: 30px;
    }
  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 30px;
    align-self: flex-end;
    margin-top: 10px;
    
    .heart {
      position: absolute;
      left: 0px;
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
    .count {
      padding: 0px 35px;
      margin: 0px -30px;
      color: rgba(black, 0.5);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>