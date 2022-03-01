<template>
    <div
      class="modal modals-product wrapper"
      @click.self="
        $store.commit('modals/close', {
          modal_name: 'product',
        })
      "
    >
      <div class="content">
        <div class="information-wrapper">
          <div class="image-wrapper">
            <img :src="product.image" alt="" class="image" />
          </div>
          <div class="information">
            <p class="name">{{ product.name }}</p>
            <p class="description">{{ product.description }}</p>
            <div class="options">
              <span class="prices">
                <p v-if="true" class="full-price">
                  {{ full_price }}1000<IconsRouble scale="0.63" />
                </p>
                <p class="price">{{ price }}<IconsRouble scale="0.8" /></p>
              </span>
              <div class="stars">
                <span class="rate"
                  >{{ product.rating.rate }}
                  <span class="count"> ({{ product.rating.count }}) </span>
                </span>
                <!-- <span class="star" id="1"></span>
                <span class="star" id="2"></span>
                <span class="star" id="3"></span>
                <span class="star" id="4"></span>
                <span class="star" id="5"></span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button
            @click="favourite"
            class="heart action-button"
            :class="{ active: product.is_favourite }"
          >
            <IconsHeart scale="1.3" />
          </button>
          <div class="action-buttons">
            <transition name="action" mode="out-in">
              <div v-if="count" class="optional-block">
                <button
                  v-if="product.pivot.count"
                  @click="remove"
                  class="remove action-button"
                >
                  <IconsClose scale="1.4" />
                </button>
                <button @click="decrease" class="decrease action-button">
                  <IconsMinus scale="1.4" />
                </button>
                <span class="count">{{ count }}</span>
              </div>
            </transition>
            <button @click="crease" class="crease action-button">
              <IconsPlus scale="1.4" />
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    favourite() {
      this.$store.commit("modals/action", ({ state }) => {
        state.product.product.is_favourite =
          !state.product.product.is_favourite;
      });
    },
    crease() {
      this.$store.commit("basket/crease",this.product);
    },
    decrease() {
      this.$store.commit("basket/decrease",this.product);
    },
    remove() {
      this.$store.commit("basket/remove",this.product);
    },
  },
  computed: {
    product() {
      return this.$store.state.modals.product.product ?? {};
    },
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
<style lang="scss" scoped>
$action_button_radius: 15px;

.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 10px;
  padding-top: 20vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: $modals_z;
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    border-radius: 17px 17px 0px 0px;
    border: 1px solid rgba(black, 0.3);
    border-bottom: 9px solid rgba(black, 0.3);
    padding: 20px;
    width: 100%;
    background-color: $white;
    min-height: 500px;
    height: auto;
    max-width: 1200px;
    @media screen and (max-width: $tablet) {
      height: auto;
      min-height: auto;
    }
    .information-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      width: 100%;
      height: 100%;
      @media screen and (max-width: $tablet) {
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        height: max-content;
      }
      .image-wrapper {
        height: 100%;
        margin-right: 10px;
        width: 25%;
        flex-shrink: 0;
        @media screen and (max-width: $tablet) {
          margin: 0px 0px 10px 0px;
          min-width: 30%;
          height: auto;
        }
        .image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .information {
        flex-grow: 1;
        @media screen and (max-width: $tablet) {
          height: max-content;
          flex-grow: 0;
        }
        .name {
          font-size: 28px;
          width: 100%;
          height: max-content;
          @media screen and (max-width: $startmobile) {
            font-size: 24px;
          }
        }
        .description {
          margin: 10px 0px;
          height: auto;
          color: rgba(0, 0, 0, 0.8);
          word-break: keep-all;
          flex-grow: 1;
        }
        .options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          width: 100%;
          .prices {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            .price {
              font-size: 24px;
              font-weight: 1000;
            }
            .full-price {
              font-size: 18px;
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
          .stars {
            display: flex;
            align-items: center;
            justify-content: center;
            .rate {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              font-size: 30px;
              .count {
                transform: translateY(-5px);
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
              }
            }
          }
        }
      }
    }
    .buttons {
      z-index: 2;
      position: absolute;
      width: 100%;
      top: 100%;
      left: 0px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      height: 53px;
      .optional-block {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        height: 100%;
      }
      .count {
        margin: 0px 10px;
        width: max-content;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        padding: 0px 20px;
        border-radius: 90px;
        border-bottom: 3px solid rgba(0, 0, 0, 0.3);
        color: rgba(0, 0, 0, 0.6);
      }
      .action-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        fill: rgba(0, 0, 0, 0.4);
        background-color: white;
        border: 1px solid rgba(black, 0.3);
        width: 53px;
        border-top: 0px;
        border-radius: $action_button_radius;
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
        border-bottom: 9px solid rgba(0, 0, 0, 0.3);
        height: 100%;
        font-size: 20px;
        padding: 5px;
        transition: 0.5s ease;

        &:active {
          transition: 0.08s;
          padding-top: 9px !important;
          padding-bottom: 9px;
          border-bottom: 4px solid rgba(0, 0, 0, 0.4);
          border-radius: $action_button_radius;
          transform: rotate3d(10deg 10deg 10deg);
          background-color: rgba(235, 235, 235);
        }
      }
      .heart {
        transform: translateX(-1px);
        border-right: 2px solid rgba(0, 0, 0, 0.4);
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
        &.active {
          fill: $red;
        }
      }
      .action-buttons {
        transform: translateX(1px);
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: row;
        .remove {
          transform: translateX(1px);
        }
        .count-buttons {
          height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          flex-direction: row;

          .action-button {
            &:first-of-type {
              border-bottom-left-radius: $action_button_radius;
              border-right: none;
            }
            &:last-of-type {
              border-left: none;
              border-bottom-right-radius: $action_button_radius;
            }
          }
        }
      }
    }
  }
}
.action-enter {
  opacity: 0;
  transform: scale(0.2) translateY(60px);
}
.action-leave-to {
  opacity: 0;
}
.action-enter-active,
.action-leave-active {
  transition: all 0.5s ease;
}
.action-move {
  position: absolute;
}
</style>