export const state = () => ([
]);

export const mutations = {
    crease(state, product) {
        if(product.count==0) state.unshift(product);
        product.count+=product.step??1;
    },

    decrease(state, product) {
        product.count-=product.step??1;
        if(product.count==0) state.splice(state.map(el=>+el.id).indexOf(+product.id),1);
    },
    remove(state,product)
    {
        product.count=0;state.splice(state.map(el=>+el.id).indexOf(+product.id),1);
    }
};

export const actions = {
};
