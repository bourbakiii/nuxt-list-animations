<template>
  <div class="animation todo-animation">
    <h1 class="standart-title centered">Список дел</h1>
    <button @click='clearItems'>очистить</button>
    <form
      @submit.prevent="addToDo"
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
    <transition name="switch" mode="out-in">
      <div v-if="items.length">
        <transition-group tag="ul" name="list" appear>
          <AnimationTodoItem
            @remove="removeItem"
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </transition-group>
      </div>
      <span v-else>Woohoo, nothing left todo!</span>
    </transition>
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
        this.$store.commit('alerts/add','123');
      }
      this.items.unshift({
        value: this.new_item_value,
        id: this.items.length ? +this.items[0].id + 1 : 1,
      });
      this.new_item_value = "";
      localStorage.setItem("todo_items", JSON.stringify(this.items));
    },
    clearItems(){
      this.items = [];
      localStorage.setItem("todo_items", JSON.stringify(this.items));
    },
    removeItem(item) {
      this.items = this.items.filter((todo) => +todo.id != +item.id);
      localStorage.setItem("todo_items", JSON.stringify(this.items));
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
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.switch-enter-to,
.switch-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.switch-enter-active {
  transition: all 0.5s ease;
}
.switch-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.list-enter-active {
  transition: all 0.4s ease-in-out;
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.6s ease-in-out;
}
.todo-animation {
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
      border-radius: 15px;
      outline: none;
      box-shadow: inset 0px 0px 10px 1px rgba($black, 0.1);
      border: none;
      padding: 0px 20px;
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