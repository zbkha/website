<template>
  <div class="todo-container">
    <Save :todos="todos"></Save>
    <div class="todo-wrap">
      <MyHeader @addTodo="addTodo"></MyHeader>
      <MyList :todos="todos"></MyList>
      <MyFooter :todos="todos" @clearDoneTodo="clearDoneTodo"></MyFooter>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import MyHeader from "../components/MyHeader";
import MyList from "../components/MyList";
import MyFooter from "../components/MyFooter";
import Save from "../components/Save";

export default {
  name: "ToDoList",
  components: {
    MyFooter,
    MyList,
    MyHeader,
    Save
  },
  data() {
    return {
      todos: []
    }
  },
  beforeMount() {
    this.$axios.get('/todolist').then(res => {
      if(res) {
        PubSub.publish('show', '/todolist')
        this.todos = res.data
      }
    })
  },
  methods: {
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(todo) {
      todo.done = !todo.done;
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
    updateTodo(todo, title) {
      todo.title = title;
    },
    checkAllTodo(_, done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      })
    },
    clearDoneTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    }
  },
  mounted() {
    this.$bus.$on('checkTodo', this.checkTodo);
    this.$bus.$on('deleteTodo', this.deleteTodo);
    this.$bus.$on('updateTodo', this.updateTodo);
    this.pubId = PubSub.subscribe('checkAllTodo', this.checkAllTodo);
  },
  beforeDestroy() {
    this.$bus.$off(['checkTodo', 'deleteTodo', 'updateTodo']);
    PubSub.unsubscribe(this.pubId);
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #49bdda;
  border: 1px solid #26bbbb;
  margin-right: 5px;
}

.btn-edit:hover {
  color: #fff;
  background-color: #26bbbb;
}

.btn-save {
  color: #fff;
  background-color: #277ae7;
  border: 1px solid #2573b2;
  margin-right: 5px;
}

.btn-save:hover {
  color: #fff;
  background-color: #2573b2;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>