export const state = () => ({ products: [] });
Array.prototype.toggle_product = function (product) {
  if (this.some((el) => +el.id == +product.id))
    this.splice(this.map((el) => +el.id).indexOf(+product.id), 1);
  else this.push(product);
};
export const mutations = {
  toggle(state, product) {
    state.products.toggle_product(product);
    product.is_favourite = !product.is_favourite;
  },
};
