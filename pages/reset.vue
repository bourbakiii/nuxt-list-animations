<template>
  <div class="page reset-page">
    <form @submit.prevent="sendResetCode" class="reset-form">
      <span class="input-block">
        <p class="input-title">Email</p>
        <span class="input-wrapper">
          <input
            v-model="email"
            type="email"
            placeholder="example@gmail.com"
            name="email"
            required
            autocomplete="off"
            :disabled="reset_loading"
          />
        </span>
      </span>
      Сейчас к вам на почту придет код для восстановления пароля
      <button class="ripple-effect action-button">
        <transition name="opacity" mode="out-in">
          <p class="unselectable" v-if="!reset_loading">Отправить код</p>
          <pulse-loader
            v-else
            :loading="reset_loading"
            color="white"
            size="6px"
          ></pulse-loader>
        </transition>
      </button>
    </form>
  </div>
</template>

<script>
import ripple from "@/mixins/effects/ripple.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    "pulse-loader": PulseLoader,
  },
  mixins: [ripple],
  data() {
    return {
      email: null,
      reset_loading: false,
    };
  },
  methods: {
    sendResetCode() {
      this.reset_loading = true;
      this.$axios
        .get("api/reset/code", this.email)
        .finally(() => this.reset_loading = false);
    },
  },
};
</script>

<style lang="scss" scoped>
.opacity {
  &-enter,
  &-leave-to {
    opacity: 0 !important;
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.1s ease !important;
  }
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  .reset-form {
    width: 100%;
    max-width: 400px;
  }
  .action-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $white;
    background-color: $black;
    outline: none;
    transition: 0.25s;
    height: 50px;
    border-radius: 15px;
    border: none;
    font-size: 16px;
    margin-top: 20px;
  }
  .input-block {
    width: 100%;
    height: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }
  .image-label {
    cursor: pointer;
    width: max-content;
    height: auto;
    min-width: 70px;
    max-width: 100%;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $black;
    border-radius: 10px;
    fill: $white;
    margin: 10px 0px;
    align-self: center;
    &.wide {
      background-color: transparent;
      width: 150px;
      height: 150px;
      .registration-image {
        width: 100%;
        height: 100%;
        clip-path: circle(50%);
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .registration-image {
      width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: contain;
    }
  }
  .input-title {
    font-size: 16px;
    margin-bottom: 6px;
  }
  .input-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;
    border: 1px solid $black;
    height: 50px;
    overflow: hidden;
    padding: 5px;
    .pre-icon {
      height: 100%;
    }
    input {
      height: 100%;
      width: 100%;
      margin: 10px 0px;
      outline: none;
      border: none;
      font-size: 20px;
      padding: 15px;
      border-radius: 15px;
      &#password-input {
        padding-right: 30px;
      }
    }
    .eye {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
}
</style>
