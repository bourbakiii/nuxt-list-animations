<template>
  <div class="page password-reset-page">
    <form @submit.prevent="checkForACode" class="code-form">
      <span class="input-block">
        <p class="input-title">Код</p>
        <span class="input-wrapper">
          <input
            v-model="code"
            type="text"
            minlength="5"
            maxlength="5"
            placeholder="*****"
            name="code"
            required
            autocomplete="off"
            :disabled="code_loading"
          />
        </span>
      </span>
      <button class="ripple-effect action-button">
        <transition name="opacity" mode="out-in">
          <p class="unselectable" v-if="!code_loading">Отправить код</p>
          <pulse-loader
            v-else
            :loading="code_loading"
            color="white"
            size="6px"
          ></pulse-loader>
        </transition>
      </button>
      <TransitionOpacity :show="!!errors.code.general_message">
        <LayoutMessageError :message="errors.code.general_message" />
      </TransitionOpacity>
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
      code: "",
      code_loading: false,
      errors: {
        code: {},
      },
    };
  },
  computed: {
    email() {
      return this.$store.state.reset.email ?? null;
    },
  },
  methods: {
    checkForACode() {
      // ! Сообщение о пустом коде
      if (!this.code) return;
          this.errors.code = {};
      this.code_loading = true;
      this.$axios
        .post("api/reset/check", {
          email: this.email,
          code: this.code,
        })
        .then(() => {
        })
        .catch(({response}) => (this.errors.code = response.data))
        .finally(() => (this.code_loading = false));
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
    margin-bottom: 10px;
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
