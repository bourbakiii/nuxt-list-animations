<template>
  <div class="page index-page">
    <NuxtLink
      to="/basket"
      v-for="block in blocks"
      :key="block.id"
      class="block"
    >
      <div :style="{ ...block.style }" class="block__content">
        <h3 class="block__content__title">Lorem ipsum dolor sit.</h3>
        <button class="block__content__link">Lorem</button>
      </div>
    </NuxtLink>
    {{blocks[0].style['border-radius']}}
    <input
      type="range"
      min="0"
      max="50"
      step="0.25"
      value='0'
      class='progress'
      @input="addPxTo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: [
        {
          id: 1,
          style: {
            "max-width": 600 + "px",
            width: 600 + "px",
            "min-width": 600 + "px",
            height: 600 + "px",
            'border-radius': '0%'
          },
        },
      ],
      progress: {
        value: 0,
      },
    };
  },
  methods: {
    addPxTo(event)
    {
      this.blocks[0].style['border-radius'] = event.target.value+'%';
    }
  },
};
</script>

<style lang='scss' scoped>
.page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  .block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    &__content {
      background-image: url("@/assets/images/block/block-placeholder.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      &__title {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: white;
        font-size: 28px;
      }
      &__link {
        width: 100px;
        height: 30px;
        background-color: white;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
  .progress {
    margin-top: 20px;
    width: 400px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 45px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    &__fill {
      position: absolute;
      top: 50%;
      width: 10%;
      left: 0px;
      height: 100%;
      border-radius: 45px;
      transform: translateY(-50%);
      background-color: orange;
    }
  }
  .procents {
    &::before {
      position: absolute;
      top: 100%;
      left: 0%;
      content: "0%";
    }
    &::after {
      position: absolute;
      top: 100%;
      right: 0%;
      content: "100%";
    }
  }
}
</style>