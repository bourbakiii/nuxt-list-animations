export const state = () => ({
    products: []
});
function save_at_local({
    name = null,
    value = null }) {
    if (!name || !value) return alert(`Переданы не все параметры - name:${name ?? 'ПУСТО'}, value:${value ?? 'ПУСТО'}`);
    if (typeof localStorage != undefined) localStorage.setItem(name, value);
    else alert('LocalStorage не прогружен');
}
function delete_by_id({
    array = null,
    id = null }) {
    if (!array || !id) return alert(`Переданы не все параметры - array:${array ?? 'ПУСТО'}, id:${id ?? 'ПУСТО'}`);
    array = array.filter(element => +element['id'] != +id);
    return array;
}
export const mutations = {
    crease(state, product) {
        if (product.pivot.count == 0) state.products.unshift(product);
        product.pivot.count = Math.min(product.pivot.count+=product.step, product.stock);
        save_at_local({ name: 'basket', value: JSON.stringify(state) });
    },
    decrease(state, product) {
        product.pivot.count = Math.max(product.pivot.count-=product.step, 0);
        state.products = state.products.filter(element=>element.pivot.count>0);
        save_at_local({ name: 'basket', value: JSON.stringify(state) });
    },
    remove(state, product) {
        product.pivot.count = 0;
        state.products = state.products.filter(element=>+element.pivot.count>0);
        save_at_local({ name: 'basket', value: JSON.stringify(state) });
    },
    action(state, action) {
        action(state);
    }
};

export const actions = {};
