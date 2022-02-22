// export const strict = false;
import Vue from 'vue';
export const actions = {
    async clientHook({ state, dispatch, commit }, context) {
        // GLOBAL_LOCAL_SET
            commit('basket/action', (basket_state) => {
                if(JSON.parse(localStorage.getItem('basket'))) Vue.set(state,'basket',JSON.parse(localStorage.getItem('basket')));
            });






    }
}
