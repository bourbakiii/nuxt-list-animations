<template>
  <div class="page button-page">
    <button @mouseleave="unhover" @mouseenter="hover" class="hover-button">
      HOVER ME
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonPage",
  mounted() {
    const elements = document.querySelectorAll(".hover-button");
    elements.forEach((element) => {
      const circle = document.createElement("div.hover-growing-circle");
      element.appendChild(circle);
    });
  },
  methods: {
    hover(event) {
      const element = event.target;
      let child = element.childNodes[0]
      console.log("hover");
    },
    unhover() {
      console.log("unhover");
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  .hover-button {
    width: 90%;
    height: 83vh;
  }
}
</style>
