<template>
  <div class="animation todo-animation">
    <h1 class="standart-title centered">Список дел</h1>
    <form
      @submit.prevent="addToDo"
      :problemText="problem.text"
      :class="{ 'problem-text': !!problem.text }"
      class="input-block"
    >
      <input
        placeholder="Add a new todo..."
        type="text"
        autocomplete="off"
        v-model="new_item_value"
        name="todo-input"
      />
    </form>
    <div v-if="items.length" class="content">
      <transition-group tag="ul" name="list" appear>
        <AnimationTodoItem
          @remove="removeItem"
          v-for="item in items" :key="item.id"
          :item="item"
        />
      </transition-group>
    </div>
    <span v-else>Woohoo, nothing left todo!</span>
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
      new_item_value: "",
    };
  },
  methods: {
    addToDo() {
      if (!this.new_item_value) {
        this.problem.text = "Неверный формат";
        clearTimeout(this.problem.timer);
        setTimeout(() => {
          this.problem.text = null;
        }, 3000);
        return;
      }
      this.items.unshift({
        value: this.new_item_value,
        id: this.items.length ? +this.items[this.items.length - 1].id + 1 : 1,
      });
      this.new_item_value = "";
      localStorage.setItem("todo_items", JSON.stringify(this.items));
    },
    removeItem(item) {
      this.items = this.items.filter((todo) => +todo.id != +item.id);
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  setup() {
    console.log("setup");
  },
  mounted() {
    console.log("mounted");
    this.items = JSON.parse(localStorage.getItem("todo_items")) ?? [];
  },
};
</script>

<style lang='scss' scoped>
/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.3s ease;
}
.todo-animation {
  width: 100%;
  max-width: 100%;
  padding: 10px;
  .input-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding-bottom: 15px;
    height: 60px;
    transition: margin 0.3s;
    input[type="text"] {
      width: 100%;
      height: 100%;
      border-radius: 15px 0px 0px 15px;
      outline: none;
      border: 2px solid $black;
      border-right: none;
      padding: 0px 10px;
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
      margin-bottom: 15px;
      &::before {
        content: attr(problemText);
        font-size: 15px;
        color: $red;
        position: absolute;
        bottom: 0px;
        left: 0px;
      }
    }
  }
  .animation-todo-item {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
}
</style>