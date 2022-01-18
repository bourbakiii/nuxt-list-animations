<template>
  <li @click="remove" class="animation-todo-item item">
    {{ item.value }}
  </li>
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
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>