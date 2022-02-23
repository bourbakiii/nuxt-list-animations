export default {
  methods:{
  open_product_modal(product) {
    this.$store.commit("modals/open", {
      modal_name: "product",
      product: product,
    });
  },
}
};
