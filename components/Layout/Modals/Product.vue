<template>
  <transition name="modal">
    <div
      v-if="show"
      @click.self="
        $store.commit('modals/close', {
          modal_name: 'product',
        })
      "
      class="modal modals-product wrapper"
    >
      <div class="content">
        {{ product.is_favourite }}
        <div class="buttons">
          <button
            class="heart action-button"
            :class="{ active: product.is_favourite }"
          >
            <IconsHeart scale="1.3" />
          </button>
          <div class="action-buttons">
            <button @click="remove" class="remove action-button">
              <IconsClose scale="1.4" />
            </button>
            <div class="count-buttons">
              <button @click="decrease" class="decrease action-button">
                <IconsMinus scale="1.4" />
              </button>
              <button @click="crease" class="crease action-button">
                <IconsPlus scale="1.4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  computed: {
    show() {
      return this.$store.state.modals.product.show;
    },
    product() {
      return this.$store.state.modals.product.product ?? {};
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
    max-width: 900px;
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
        .count-buttons {
          height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          flex-direction: row;
          .action-button {
            &:first-of-type {
              border-bottom-left-radius: $action_button_radius;
              border-right:none;
            }
            &:last-of-type {
              border-left:none;
              border-bottom-right-radius: $action_button_radius;
            }
          }
        }
      }
    }
  }
}
</style>