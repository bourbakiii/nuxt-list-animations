import Vue from "vue";
// import axios from "axios";
function save_at_local({ name = null, value = null }) {
  if (!name || !value)
    return alert(
      `Переданы не все параметры - name:${name ?? "ПУСТО"}, value:${
        value ?? "ПУСТО"
      }`
    );
  if (typeof localStorage != undefined) localStorage.setItem(name, value);
  else alert("LocalStorage не прогружен");
}
export const state = () => ({
  reset: {
    email: null,
    permission: false,
  },
});

export const mutations = {
  setParameter(state, { name = null, value = null }) {
    if (!name || !value)
      alert(
        `Index.js/SetParameter - не все параметры переданы name:${name} value:${value}`
      );
    Vue.set(state, name, value);
    save_at_local({name:"reset",value:JSON.stringify(state.reset)});
  },
};
export const actions = {
  async nuxtServerInit({ state, dispatch }) {
    // dispatch('account/get');
    // console.log(state);
  },
  async clientHook({ state, dispatch, commit }, context) {
    // GLOBAL_LOCAL_SET
    dispatch("account/getByToken", localStorage.getItem("token"));
    commit("basket/action", (basket_state) => {
      if (JSON.parse(localStorage.getItem("basket")))
        Vue.set(state, "basket", JSON.parse(localStorage.getItem("basket")));
    });
  },
};
