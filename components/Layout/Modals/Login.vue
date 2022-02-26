<template>
  <transition name="modal">
    <div
      class="modal modals-product wrapper"
      v-if="show"
      @click.self="$store.commit('modals/close', { modal_name: 'login' })"
    >
    <transition name='opacity' mode='out-in'>
      <form v-if='current_form=="login"' @submit.prevent="login" class="content">
        <span class="title-row">
          <h2 class="micro-title">Авторизация</h2>
          <button @click.prevent='current_form="registration"' class="switch-button ripple-effect"
            >Регистрация</button
          >
        </span>
        <span class="input-block">
          <p class="input-title">Email</p>
          <span class="input-wrapper">
            <IconsProfile scale="1.2" class="pre-icon" />
            <input
              v-model="email"
              type="email"
              placeholder="example@gmail.com"
              name="email"
              required
              autocomplete="off"
            />
          </span>
        </span>
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
              id="password-input"
            />
            <transition name="opacity">
              <IconsEyeOpened
                @click.native="show_password = !show_password"
                v-if="!show_password && password"
                class="eye"
                scale="0.6"
              />
              <IconsEyeClosedR
                @click.native="show_password = !show_password"
                v-else-if="password"
                class="eye"
                scale="0.6"
              />
            </transition>
          </span>
        </span>
        <button class="ripple-effect login-button">
          <transition name="opacity" mode="out-in">
            <p class="unselectable" v-if="!loading">Вход</p>
            <pulse-loader
              v-else
              :loading="loading"
              color="white"
              size="6px"
            ></pulse-loader>
          </transition>
        </button>
        <NuxtLink to="/reset" class="forget-button">Забыли пароль?</NuxtLink>
      </form>
      <form v-else @submit.prevent="registration" class="content">
        
      </form>
    </transition>
    </div>
  </transition>
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
      password: null,
      loading: false,
      show_password: false,
      current_form : 'login'
    };
  },

  
  methods: {
    login() {
      if (this.loading) return;
      //   if (!this.email && !this.password) {
      // сделать сообщения об ошибке и валидации
      // console.log("!!!Логин или пароль пусты");
      //   }
      this.loading = true;
      this.$store.dispatch("account/action", {
        email: this.email,
        password: this.password,
        action: (state, { email = null, password = null }) => {
          this.$axios
            .post(
              "https://fakestoreapi.com/auth/login",
              {
                method: "POST",
              }
              //   {
              // params: JSON.stringify({
              //   email: "mor_2314",
              //   password: "83r5^_",
              // }),
              //   }
            )
            .then(({ data }) => {
              console.log(data);
            })
            .catch(({ error }) => console.log(error))
            .finally(() => {
              this.loading = false;
            });
        },
      });
    },
  },
  computed: {
    show() {
      return this.$store.state.modals.login.show;
    },
  },
  watch:{
    show(){
      this.current_form='login';
    }
  }
};
</script>
<style lang="scss" scoped>
.opacity {
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.1s ease;
  }
}

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

  .content {
    width: 100%;
    max-width: 400px;
    height: max-content;
    background-color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 10px;
    .title-row {
      width: 100%;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-direction: row;
      .switch-button {
        width: max-content;
        padding: 0px 10px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: $white;
        background-color: $black;
        outline: none;
        transition: 0.25s;
        height: 30px;
        border-radius: 15px;
        border: none;
        font-size: 16px;
        margin-top: 20px;
        transform: translateY(-1px);
      }
    }
    .login-button {
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
    .forget-button {
      width: 100%;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      text-decoration: none;
      color: $black;
    }
  }
  .input-block {
    width: 100%;
    height: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
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
