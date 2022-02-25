export const state = () => ({
    product: {
        show: false,
        product: null
    },
    login:{
        show: true
    }
});
export const mutations = {
    action(state,action){
        action(state);
    },
    open(state, props) {
        for (let modal_key in state) state[modal_key].show = false;
        state[props.modal_name].show = true;
        document.lastChild.classList.add('html_overflow');
        switch (props.modal_name) {
            case "product": {
                state.product.product = props.product;
                break;
            }
        }
    },
    close(state, props) {
        for (let modal_key in state) state[modal_key].show = false;
        document.lastChild.classList.remove('html_overflow');
        switch (props.modal_name) {
            case "product": {
                state.product.product = null;
                break;
            }
            case "login": {
                // state.login 
                break;
            }
        }
    },
}
