// export const strict = false;
import Vue from 'vue';
import axios from 'axios';
export const actions = {
    async nuxtServerInit({ state, dispatch }) {
        // dispatch('account/get');
        // console.log(state);
    },
    async clientHook({ state, dispatch, commit }, context) {
        // GLOBAL_LOCAL_SET
        dispatch('account/getByToken', localStorage.getItem('token'));
        commit('basket/action', (basket_state) => {
            if (JSON.parse(localStorage.getItem('basket'))) Vue.set(state, 'basket', JSON.parse(localStorage.getItem('basket')));
        });
    }
}
