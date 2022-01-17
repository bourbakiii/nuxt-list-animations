<template>
  <div class="animation todo-animation">
      <h1 class="standart-title centered">Список дел</h1>
    <form
      @submit.prevent="addToDo"
      :problemText="problem.text"
      :class="{ 'problem-text': !!problem.text }"
      class="input-block"
    >
      <input type="text" v-model="new_item" name="todo-input" />
      <input type="submit" value="Добавить" />
    </form>
    <AnimationTodoItem :key='index' v-for='(item,index) in items' :item='item'/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      problem: {
        text: null,
        timer: null,
      },
      new_item: "",
    };
  },
  methods: {
    addToDo() {
      if (!this.new_item) {
        this.problem.text = "Неверный формат";
        clearTimeout(this.problem.timer);
        setTimeout(() => {
          this.problem.text = null;
        }, 3000);
        return;
      }
      this.items.push(this.new_item);
      localStorage.setItem('todo_items',JSON.stringify(this.items));
    },
  },
  mounted(){
      this.items = JSON.parse(localStorage.getItem('todo_items'))??[];
  }
};
</script>

<style lang='scss' scoped>
.todo-animation {
    width:100%;
    max-width:100%;
  padding: 10px;
  .input-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding-bottom: 15px;
    height: 60px;
    input[type="text"] {
      width: 100%;
      height: 100%;
      border-radius: 15px 0px 0px 15px;
      outline: none;
      border: 2px solid  $black;
      border-right: none;
      padding:0px 10px;
    }
    input[type="submit"] {
      width: 140px;
      height: 100%;
      border-radius: 0px 15px 15px 0px;
      outline: none;
      border: 2px solid $black;
      color: white;
      background-color: $black;
      font-size: 15px;
    }
    &.problem-text {
      &::before {
        content: attr(problemText);
        font-size: 15px;
        color: rgba(200, 100, 100);
        position: absolute;
        bottom: 0px;
        left: 0px;
      }
    }
  }
}
</style>