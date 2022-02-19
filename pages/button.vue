<template>
  <div class="page button-page">
    <button @mouseleave="unhover" @mouseenter="hover" class="hover-button">
      <p class="content">HOVER ME</p>
      <span class="hover-button__bubble"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonPage",
  methods: {
    hover(event) {
      let bubble = event.target.querySelector(".hover-button__bubble");
      bubble.classList.add("action");
      let [width, height] = [
        event.target.getBoundingClientRect().width * 3,
        event.target.getBoundingClientRect().height * 3,
      ];
      [
        bubble.style.width,
        bubble.style.height,
        bubble.style.left,
        bubble.style.top,
      ] = [
        Math.max(width, height) + "px",
        Math.max(width, height) + "px",
        event.offsetX + "px",
        event.offsetY + "px",
      ];
    },

    unhover(event) {
      let bubble = event.target.querySelector(".hover-button__bubble");
      bubble.classList.remove("action");
      [
        bubble.style.width,
        bubble.style.height,
        bubble.style.left,
        bubble.style.top,
      ] = ["0px", "0px", event.offsetX + "px", event.offsetY + "px"];
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  .cursor {
    // transition: 0.2s linear;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 90px;
    background-color: red;
  }
  .hover-button {
    width: 30%;
    height: 33vh;
    overflow: hidden;
    background-color: transparent;
    border-radius: 90px;
    transition: all 1s, color 0.4s;
    font-size: 20px;
    color: $black;
    .content {
      z-index: 1;
    }
    &:hover {
      background-color: $black;
      color: $white;
    }
    &__bubble {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 0px;
      height: 0px;
      transform: translate(-50%, -50%);
      background-color: $black;
      opacity: 0.5;
      clip-path: circle();
      transition: all 0.7s, top 0s, left 0s;
      &.action {
        opacity: 1;
      }
    }
  }
}
</style>
