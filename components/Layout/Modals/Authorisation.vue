<template>
  <div
    class="modal modals-authorisation wrapper"
    @mousedown.self="
      $store.commit('modals/close', { modal_name: 'authorisation' })
    "
  >
    <transition name="opacity" mode="out-in">
      <form
        v-if="current_form == 'login'"
        @submit.prevent="sign_in"
        class="content"
      >
        <span class="title-row">
          <h2 class="micro-title">Вход</h2>
          <span
            @click="switchForm"
            class="switch-button ripple-effect"
            :disabled="login_loading"
          >
            Регистрация
          </span>
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
          <span class="error" v-if="errors.login.validation_errors">
            {{ errors.login.validation_errors.email }}
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
          <span class="error" v-if="errors.login.validation_errors">
            {{ errors.login.validation_errors.password }}
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
        <NuxtLink to="/reset/send" class="forget-button">Забыли пароль?</NuxtLink>
        <TransitionOpacity :show="!!errors.login.general_message">
          <LayoutMessageError :message="errors.login.general_message" />
        </TransitionOpacity>
      </form>
      <form v-else @submit.prevent="register" class="content">
        <span class="title-row">
          <h2 class="micro-title">Регистрация</h2>
          <span
            @click="switchForm"
            class="switch-button ripple-effect"
            :disabled="registration_loading"
          >
            Вход
          </span>
        </span>
        <!-- <label
          for="registration-image-input"
          :class="{ wide: registration_image }"
          class="image-label input-block"
        >
          <IconsPlus v-if="!registration_image" scale="2.3" />
          <img
            v-if="registration_image"
            :src="registration_image"
            alt="Profile image"
            class="registration-image"
          />
          <input
            type="file"
            placeholder="Введите имя"
            name="name"
            required
            id="registration-image-input"
            class="unshowed"
            :disabled="registration_loading"
            @input="loadImage"
            multiple="false"
          />
        </label> -->
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
          <span class="error" v-if="errors.registration.validation_errors">
            {{ errors.registration.validation_errors.name }}
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
          <span class="error" v-if="errors.registration.validation_errors">
            {{ errors.registration.validation_errors.surname }}
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
          <span class="error" v-if="errors.registration.validation_errors">
            {{ errors.registration.validation_errors.father_name }}
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
          <span class="error" v-if="errors.registration.validation_errors">
            {{ errors.registration.validation_errors.email }}
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
          <span class="error" v-if="errors.registration.validation_errors">
            {{ errors.registration.validation_errors.password }}
          </span>
        </span>
        <span class="input-block">
          <p class="input-title">Повтор пароля</p>
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
        <TransitionOpacity :show="!!errors.registration.general_message">
          <LayoutMessageError :message="errors.registration.general_message" />
        </TransitionOpacity>
      </form>
    </transition>
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
      errors: {
        login: {
          general_message: null,
        },
        registration: {
          general_message: null,
        },
      },
      login: {
        email: "gabisov03912@gmail.com",
        password: "12312",
      },
      registration: {
        name: "Руслан",
        surname: "Габисов",
        father_name: "Хасанович",
        email: "gabisov03912@gmail.com",
        password: "123123",
        password_repeat: "123123",
      },
      login_loading: false,
      registration_loading: false,
      show_login_password: false,
      show_registration_password: false,
      show_registration_password_repeat: false,
      current_form: "login",
      registration_image: null,
    };
  },
  methods: {
    loadImage(event) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = () => (this.registration_image = fileReader.result);
    },
    sign_in() {
      if (this.login_loading) return;
      //   if (!this.email && !this.password) {
      // сделать сообщения об ошибке и валидации
      // ! console.log("!!!Логин или пароль пусты");
      // ! МОДАЛКА ОШИБКИ
      //   }
      this.login_loading = true;
      this.$store.dispatch("account/action", {
        email: this.login.email,
        password: this.login.password,
        action: (state, { email = null, password = null }) => {
          this.$axios
            .post(`/api/user`, { email, password })
            .then(({ data }) => {
              this.$store.commit("modals/close", {
                modal_key: "login",
              });
              state.commit("set_account", data.user);
            })
            .catch(({ response }) => {
              if (!Object.keys(response.data).includes("success")) {
                console.log("%cНеобработанная ошибка", "background-color:red");
                console.log(response.data);
              } else {
                this.errors.login = response.data;
              }
            })
            .finally(() => {
              this.login_loading = false;
            });
        },
      });
    },
    register() {
      // if (this.registration_loading) return;
      //   if (!this.email && !this.password) {
      // сделать сообщения об ошибке и валидации
      // ! console.log("!!!Логин или пароль пусты");
      // ! МОДАЛКА ОШИБКИ
      //   }
      if (this.registration.password != this.registration.password_repeat)
        return alert("Пароли не совпадают");
      this.registration_loading = true;
      this.$store.dispatch("account/action", {
        ...this.registration,
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
            .post("api/users", {
              name,
              surname,
              father_name,
              email,
              password,
              password_repeat,
            })
            .then(({ data }) => {
              this.$store.commit("modals/close", {
                modal_key: "login",
              });
              state.commit("set_account", data.user);
            })
            .catch(({ response }) => {
              if (!Object.keys(response.data).includes("success")) {
                console.log("%cНеобработанная ошибка", "background-color:red");
                console.log(response.data);
              } else {
                this.errors.registration = response.data;
              }
            })
            .finally(() => {
              this.registration_loading = false;
            });
        },
      });
    },
    switchForm() {
      this.current_form == "login"
        ? (() => {
            this.current_form = "registration";
            this.registration = {
              name: "Руслан",
              surname: "Габисов",
              father_name: "Хасанович",
              email: "gabisov03912@gmail.com",
              password: "123123",
              password_repeat: "123123",
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
          this.errors = {
        login: {
          general_message: null,
        },
        registration: {
          general_message: null,
        },
         }
    },
  },
  watch: {
    show() {
      this.current_form = "registration";
    },
    "$route.path"() {
      this.$store.commit("modals/close", { modal_name: "authorisation" });
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
  overflow-y: auto;

  padding-bottom: 50px;
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
        &:disabled,
        &[disaabled] {
          opacity: 0.6;
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
    .error {
      color: $red;
    }
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
