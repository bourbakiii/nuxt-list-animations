<template>
  <button @click="remove" class="animation-todo-item item">
    {{ item.value }}
  </button>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
  },
  methods: {
    remove() {
      this.$emit("remove", this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  list-style-type: none;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  outline: none;
  border:none;
  text-align: left;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>