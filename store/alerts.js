export const state = () => ({
    items: [1,2,3,4,5,6,7,8,9,10]
});

export const mutations = {
    add(state, text){
        state.items.push(text);
    }
};

export const actions = {
};
