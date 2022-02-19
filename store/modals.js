export const state = () => ({
    product:{
        show:false,
        product: null
    }
});

export const mutations = {
    open(state,props){
        switch(props.name){
            case 'product':{
                state.product.show = true;
                state.product.product = props.product;
                break;
            }
        }
    }
};

export const actions = {
};
