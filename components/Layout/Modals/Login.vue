<template>
  <transition name="modal">
    <div
      class="modal modals-product wrapper"
      v-if="show"
      @click.self="$store.commit('modals/close', { modal_name: 'login' })"
    >
      <form @submit.prevent="login" class="content">
        <h3 class="micro-title">Авторизация</h3>
        <span class="input-block">
          <p class="input-title">Имя пользователя</p>
          <span class="input-wrapper">
            <IconsProfile scale="1.2" class="pre-icon" />
            <input
              v-model="username"
              type="text"
              placeholder="Имя пользователя"
              name="username"
              required
              autocomplete="off"
            />
          </span>
        </span>
        <span class="input-block">
          <p class="input-title">Пароль</p>
          <span class="input-wrapper">
            <IconsLock class="pre-icon" scale='0.9' />
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
              <IconsEyeClosed
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
            <p class='unselectable' v-if="!loading">Вход</p>
            <pulse-loader
              v-else
              :loading="loading"
              color="white"
              size="6px"
            ></pulse-loader>
          </transition>
        </button>
      </form>
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
      username: null,
      password: null,
      loading: false,
      show_password: false,
    };
  },
  methods: {
    login() {
      if(this.loading) return;
      //   if (!this.username && !this.password) {
      // сделать сообщения об ошибке и валидации
      // console.log("!!!Логин или пароль пусты");
      //   }
      this.loading = true;
      this.$store.dispatch("account/action", {
        username: this.username,
        password: this.password,
        action: (state, { username = null, password = null }) => {
          this.$axios
            .post(
              "https://fakestoreapi.com/auth/login",
              {
                method: "POST",
              }
              //   {
              // params: JSON.stringify({
              //   username: "mor_2314",
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
      height:100%;
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
      &#password-input{
        padding-right:30px;
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
