export const state = () => ({
    items: []
});

export const mutations = {
    add(state, text){
        state.items.push(text);
    }
};

export const actions = {
};
