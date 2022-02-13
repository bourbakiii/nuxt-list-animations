<template>
  <div class="product">
    <img src="@/assets/images/product.jpg" class="image" />
    <p class="name">{{ product.name }}</p>
    <span class="prices">
      <p class="price">{{ price.toFixed(2) }}<IconsRouble scale="0.6" /></p>
      <p v-if="full_price" class="full-price">
        {{ full_price.toFixed(2) }}<IconsRouble scale="0.6" />
      </p>
    </span>
    <div class="buttons">
      <transition name="show" appear>
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
.show-enter
{
  opacity: 0;
  transform: translateY(-10px);
}
.show-enter-to{
  transition: all 0.2s ease;
}
.show-leave-to
{
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(10px);
}


.product {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: 0.1px solid rgba(white, 0.1);
  background-color: white;
  padding: 7px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  .image {
    border-radius: 15px;
    width: 100%;
    object-fit: contain;
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
  .prices {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }
  .buttons {
    position: absolute;
    bottom: 7px;
    right: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    height: 30px;
    .count {
      padding: 0px 35px;
      margin: 0px -30px;
      color: rgba(black, 0.5);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pushable-button {
      width: 30px;
      height: 30px;
      border-radius: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      border: 1px solid rgba(black, 0.2);
      border-bottom-width: 3px;
      background-color: transparent;
      transition: 0.3s;
      z-index: 1;
      &:active {
        border: 1px solid rgba(black, 0.2);
        transform: scale(0.96);
      }
    }
  }
}
</style>