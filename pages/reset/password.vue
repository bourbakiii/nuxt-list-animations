<template>
  <div class="page password-reset-page">
    <form
      v-if="form == 'code'"
      @submit.prevent="checkForACode"
      class="code-form"
    >
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
    <form
      v-if="form == 'password'"
      @submit.prevent="sendPassword"
      class="code-form"
    >
      <span class="input-block">
        <p class="input-title">Пароль</p>
        <span class="input-wrapper">
          <IconsLock class="pre-icon" scale="0.9" />
          <input
            v-model="password"
            :type="show_password ? 'type' : 'password'"
            placeholder="*******"
            name="password"
            required
            class="password-input"
            :disabled="password_loading"
          />
          <transition name="opacity">
            <IconsEyeOpened
              @click.native="show_password = !show_password"
              v-if="!show_password && password"
              class="eye"
              scale="0.6"
            />
            <IconsEyeClosed
              @click.native="show_password = !show_password"
              v-else-if="password"
              class="eye"
              scale="0.6"
            />
          </transition>
        </span>
        <span class="error" v-if="errors.password.validation_errors">
          {{ errors.password.validation_errors.password }}
        </span>
      </span>
      <span class="input-block">
        <p class="input-title">Повтор пароля</p>
        <span class="input-wrapper">
          <IconsLock class="pre-icon" scale="0.9" />
          <input
            v-model="password_repeat"
            :type="show_password_repeat ? 'type' : 'password'"
            placeholder="*******"
            name="password_repeat"
            required
            class="password-repeat-input"
            :disabled="password_repeat_loading"
          />
          <transition name="opacity">
            <IconsEyeOpened
              @click.native="show_password_repeat = !show_password_repeat"
              v-if="!show_password_repeat && password_repeat"
              class="eye"
              scale="0.6"
            />
            <IconsEyeClosed
              @click.native="show_password_repeat = !show_password_repeat"
              v-else-if="password_repeat"
              class="eye"
              scale="0.6"
            />
          </transition>
        </span>
        <span class="error" v-if="errors.password.validation_errors">
          {{ errors.password.validation_errors.password_repeat }}
        </span>
      </span>
      <button class="ripple-effect action-button">
        <transition name="opacity" mode="out-in">
          <p class="unselectable" v-if="!password_loading">Сменить пароль</p>
          <pulse-loader
            v-else
            :loading="password_loading"
            color="white"
            size="6px"
          ></pulse-loader>
        </transition>
      </button>
      <TransitionOpacity :show="!!errors.password.general_message">
        <LayoutMessageError :message="errors.password.general_message" />
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
      password: null,
      password_repeat: null,
      show_password: false,
      show_password_repeat: false,
      form: "code",
      code: "",
      code_loading: false,
      password_loading: false,
      password_repeat_loading: false,
      errors: {
        code: {},
        password: {},
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
          this.$store.commit('setParameter',{name:"reset",value:{
                email: this.$store.state.reset.email,
                permission:true
              }});
          this.form = "password";
        })
        .catch(({ response }) => {
          this.errors.code = response.data;
        })
        .finally(() => this.code_loading = false);
    },
    sendPassword() {
      console.log("Работай, долбаеб");
      // ! Сообщения
      if (!this.password || !this.password_repeat || this.password != this.password_repeat) return;
      this.errors.password = {};
      this.password_loading = true;
      this.$axios
        .put("api/reset", {
          email: this.email,
          password: this.password,
        })
        .then(({data}) => {
          this.$router.push("/");
              this.$store.commit("account/set_account", data.user);
              this.$store.commit('setParameter',{name:"reset",value:{
                email:null,
                permission:false
              }});
        })
        .catch(({ response }) => {
          this.errors.password = response.data;
        })
        .finally(() => this.password_loading = false);
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
