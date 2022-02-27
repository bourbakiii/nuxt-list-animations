<template>
  <transition name="modal">
    <div
      class="modal modals-product wrapper"
      v-if="show"
      @click.self="$store.commit('modals/close', { modal_name: 'login' })"
    >
      <transition name="opacity" mode="out-in">
        <form
          v-if="current_form == 'login'"
          @submit.prevent="sign_in"
          class="content"
        >
          <span class="title-row">
            <h2 class="micro-title">Вход</h2>
            <button
              @click.prevent="switchForm"
              class="switch-button ripple-effect"
              :disabled="login_loading"
            >
              Регистрация
            </button>
          </span>
          <span class="input-block">
            <p class="input-title">Email</p>
            <span class="input-wrapper">
              <IconsProfile scale="1.2" class="pre-icon" />
              <input
                v-model="login.email"
                type="email"
                placeholder="example@gmail.com"
                name="email"
                required
                autocomplete="off"
                :disabled="login_loading"
              />
            </span>
          </span>
          <span class="input-block">
            <p class="input-title">Пароль</p>
            <span class="input-wrapper">
              <IconsLock class="pre-icon" scale="0.9" />
              <input
                v-model="login.password"
                :type="show_login_password ? 'type' : 'password'"
                placeholder="*******"
                name="password"
                required
                class="password-input"
                :disabled="login_loading"
              />
              <transition name="opacity">
                <IconsEyeOpened
                  @click.native="show_login_password = !show_login_password"
                  v-if="!show_login_password && login.password"
                  class="eye"
                  scale="0.6"
                />
                <IconsEyeClosed
                  @click.native="show_login_password = !show_login_password"
                  v-else-if="login.password"
                  class="eye"
                  scale="0.6"
                />
              </transition>
            </span>
          </span>
          <button class="ripple-effect action-button">
            <transition name="opacity" mode="out-in">
              <p class="unselectable" v-if="!login_loading">Вход</p>
              <pulse-loader
                v-else
                :loading="login_loading"
                color="white"
                size="6px"
              ></pulse-loader>
            </transition>
          </button>
          <NuxtLink to="/reset" class="forget-button">Забыли пароль?</NuxtLink>
        </form>
        <form v-else @submit.prevent="register" class="content">
          <span class="title-row">
            <h2 class="micro-title">Регистрация</h2>
            <button
              @click.prevent="switchForm"
              class="switch-button ripple-effect"
              :disabled="registration_loading"
            >
              Вход
            </button>
          </span>
          <span class="input-block">
            <p class="input-title">Имя</p>
            <span class="input-wrapper">
              <input
                v-model="registration.name"
                type="text"
                placeholder="Введите имя"
                name="name"
                required
                autocomplete="off"
                :disabled="registration_loading"
              />
            </span>
          </span>
          <span class="input-block">
            <p class="input-title">Фамилия</p>
            <span class="input-wrapper">
              <input
                v-model="registration.surname"
                type="text"
                placeholder="Введите фамилию"
                name="surname"
                required
                autocomplete="off"
                :disabled="registration_loading"
              />
            </span>
          </span>
          <span class="input-block">
            <p class="input-title">Отчество</p>
            <span class="input-wrapper">
              <input
                v-model="registration.father_name"
                type="text"
                placeholder="Введите отчество"
                name="father_name"
                required
                autocomplete="off"
                :disabled="registration_loading"
              />
            </span>
          </span>
          <span class="input-block">
            <p class="input-title">Email</p>
            <span class="input-wrapper">
              <input
                v-model="registration.email"
                type="email"
                placeholder="example@gmail.com"
                name="email"
                required
                autocomplete="off"
                :disabled="registration_loading"
              />
            </span>
          </span>
          <span class="input-block">
            <p class="input-title">Пароль</p>
            <span class="input-wrapper">
              <IconsLock class="pre-icon" scale="0.9" />
              <input
                v-model="registration.password"
                :type="show_registration_password ? 'type' : 'password'"
                placeholder="*******"
                name="password"
                required
                class="password-input"
                :disabled="registration_loading"
              />
              <transition name="opacity">
                <IconsEyeOpened
                  @click.native="
                    show_registration_password = !show_registration_password
                  "
                  v-if="!show_registration_password && registration.password"
                  class="eye"
                  scale="0.6"
                />
                <IconsEyeClosed
                  @click.native="
                    show_registration_password = !show_registration_password
                  "
                  v-else-if="registration.password"
                  class="eye"
                  scale="0.6"
                />
              </transition>
            </span>
          </span>
          <span class="input-block">
            <p class="input-title">Потвор пароля</p>
            <span class="input-wrapper">
              <IconsLock class="pre-icon" scale="0.9" />
              <input
                v-model="registration.password_repeat"
                :type="show_registration_password_repeat ? 'type' : 'password'"
                placeholder="*******"
                name="password"
                required
                class="password-input"
                :disabled="registration_loading"
              />
              <transition name="opacity">
                <IconsEyeOpened
                  @click.native="
                    show_registration_password_repeat =
                      !show_registration_password_repeat
                  "
                  v-if="
                    !show_registration_password_repeat &&
                    registration.password_repeat
                  "
                  class="eye"
                  scale="0.6"
                />
                <IconsEyeClosed
                  @click.native="
                    show_registration_password_repeat =
                      !show_registration_password_repeat
                  "
                  v-else-if="registration.password_repeat"
                  class="eye"
                  scale="0.6"
                />
              </transition>
            </span>
          </span>
          <button class="ripple-effect action-button">
            <transition name="opacity" mode="out-in">
              <p class="unselectable" v-if="!registration_loading">
                Зарегистрироваться
              </p>
              <pulse-loader
                v-else
                :loading="registration_loading"
                color="white"
                size="6px"
              ></pulse-loader>
            </transition>
          </button>
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
      login: {
        email: null,
        password: null,
      },
      registration: {
        name: null,
        surname: null,
        father_name: null,
        email: null,
        password: null,
        password_repeat: null,
      },
      login_loading: false,
      registration_loading: false,
      show_login_password: false,
      show_registration_password: false,
      show_registration_password_repeat: false,
      current_form: "login",
    };
  },
  methods: {
    sign_in() {
      if (this.login_loading) return;
      //   if (!this.email && !this.password) {
      // сделать сообщения об ошибке и валидации
      // console.log("!!!Логин или пароль пусты");
      //   }
      this.login_loading = true;
      this.$store.dispatch("account/action", {
        email: this.login.email,
        password: this.login.password,
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
              this.login_loading = false;
            });
        },
      });
    },
    register() {
      if (this.registration_loading) return;
      //   if (!this.email && !this.password) {
      // сделать сообщения об ошибке и валидации
      // console.log("!!!Логин или пароль пусты");
      //   }
      if (this.registration.password != this.registration.password_repeat)
        return alert("Пароли не совпадают");
      this.registration_loading = true;
      action: (
        state,
        {
          name = null,
          surname = null,
          father_name = null,
          email = null,
          password = null,
          password_repeat = null,
        }
      ) => {
        this.$axios
          .post(
            "https://fakestoreapi.com/auth/register",
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
            this.registration_loading = false;
          });
      };
    },
    switchForm() {
      this.current_form == "login"
        ? (() => {
            this.current_form = "registration";
            this.registration = {
              name: null,
              surname: null,
              father_name: null,
              email: null,
              password: null,
              password_repeat: null,
            };
            [
              this.show_registration_password,
              this.show_registration_password_repeat,
            ] = [false, false];
          })()
        : (() => {
            this.current_form = "login";
            this.login = {
              email: null,
              password: null,
            };
            this.show_login_password = false;
          })();
    },
  },
  computed: {
    show() {
      return this.$store.state.modals.login.show;
    },
  },
  watch: {
    show() {
      this.current_form = "registration";
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
    background-color: $white;
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
        transition: 0.3s;
        &:disabled, &[disaabled]
        {
          opacity:0.6;
        }
      }
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
