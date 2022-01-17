import Vue from 'vue';

export const state = () => ({
    current: null,
});

export const mutations = {
    select_animation(state, animation_name){
        state.current = animation_name;
    }
};

export const actions = {
};
