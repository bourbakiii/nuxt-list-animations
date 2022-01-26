<template>
  <div class="page button-page">
    <button @mouseleave="unhover"  @mouseenter="hover" class="hover-button">
      HOVER ME
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
      bubble.style.width = Math.max(width, height) + "px";
      bubble.style.height = Math.max(width, height) + "px";
      bubble.style.left = event.offsetX + "px";
      bubble.style.top = event.offsetY + "px";
    },

    unhover(event) {
      let bubble = event.target.querySelector(".hover-button__bubble");
      bubble.classList.remove("action");
      bubble.style.width = "0px";
      bubble.style.height = "0px";
      bubble.style.left = event.offsetX + "px";
      bubble.style.top = event.offsetY + "px";
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  .hover-button {
    width: 90%;
    height: 83vh;
    overflow: hidden;
    background-color: transparent;
    &__bubble {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 0px;
      height: 0px;
      transform: translate(-50%, -50%);
      background-color: red;
      opacity: 0.5;
        clip-path: circle();
        transition: all 1s, top 0s, left 0s;
      &.action {
        opacity: 1;
      }
    }
  }
}
</style>
