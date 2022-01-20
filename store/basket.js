export const state = () => ([
]);

export const mutations = {
    crease(state, product) {
        if (product.count == 0) { product.count = product.step ?? 1; return state.unshift(product); }
        return product.count+=product.step??1;
    },

    decrease(state, product) {
        product.count-=product.step??1;
        if (product.count == 0) { product.count = product.step ?? 1; return state.splice(product,1); }
    }
};

export const actions = {
};
