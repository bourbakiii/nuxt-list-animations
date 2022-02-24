<template>
  <transition name="modal">
    <div
      class="modal modals-product wrapper"
      v-if="show"
      @click.self="
        $store.commit('modals/close', {
          modal_name: 'login',
        })
      "
    >
      <form @submit.prevent="login" class="content">
        <h3 class="micro-title">Авторизация</h3>
        <span class="input-wrapper">
          <p class="input-title">Имя пользователя</p>
          <input
            v-model="username"
            type="text"
            placeholder="Имя пользователя"
            name="username"
          />
          <span class="problem">Текст проблемы</span>
        </span>
        <span class="input-wrapper">
          <p class="input-title">E-mail</p>
          <input
            v-model="password"
            type="password"
            placeholder="*******"
            name="password"
          />
          <span class="problem">Текст проблемы</span>
        </span>
        <button class="login-button">Войти</button>
      </form>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
    //   if (!this.username && !this.password) {
        // сделать сообщения об ошибке и валидации
        // console.log("!!!Логин или пароль пусты");
    //   }
      this.$store.dispatch("account/action", {
        username: this.username,
        password: this.password,
        action: (state, { username = null, password = null }) => {
          this.$axios
            .post(
              "https://fakestoreapi.com/auth/login",
              {
                method: "POST",
              },
            //   {
                // params: JSON.stringify({
                //   username: "mor_2314",
                //   password: "83r5^_",
                // }),
            //   }
            )
            .then(({data}) => {console.log(data);})
            .catch(({error}) => console.log(error));
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
    max-width: 100%;
    width: 400px;
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
      &:active {
        background-color: $selection_color;
        transform: scale(0.98);
      }
    }
  }
  .input-wrapper {
    width: 100%;
    height: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    .input-title {
      font-size: 16px;
    }
    input {
      width: 100%;
      margin: 10px 0px;
      border: 1px solid $black;
      outline: none;
      border-radius: 15px;
      height: 50px;
      font-size: 20px;
      padding: 15px;
    }
  }
}
</style>
