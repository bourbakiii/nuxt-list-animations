<template>
  <div class="animation-todo-item item">
    <p class="text">
      {{ item }}
    </p>
    <div class="buttons">
      <button @click="confirm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <path
            d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
          ></path>
        </svg>
      </button>
      <button @click="remove">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 32 32"
        >
          <path
            d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      require: true,
    },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  max-width: 100%;
  background-color: $black;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 15px;
  padding: 7px 12px;
  height: auto;
  .text{
      max-width:200px;
      height:auto;
      line-break: auto;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: max-content;
    button {
      background-color: $white;
      border: none;
      border-radius: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      &:first-of-type {
        margin-right: 6px;
      }
      svg {
        width: 70%;
        * {
          fill: $black;
        }
      }
    }
  }
}
</style>