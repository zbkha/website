<template>
  <div class="todo-footer" v-show="total">
    <label>
<!--      <input type="checkbox" :checked="isAll" @change="checkAll"/>-->
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
      <span>已完成{{doneTotal}}</span> / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearDone">清除已完成任务</button>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
export default {
  name: "MyFooter",
  props: ['todos'/*, 'checkAllTodo', 'clearDoneTodo'*/],
  computed: {
    total() {
      return this.todos.length
    },
    doneTotal() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.done? 1: 0)
      }, 0)
    },
    isAll: {
      get() {
        return this.doneTotal === this.total
      },
      set(val) {
        PubSub.publish('checkAllTodo', val);
        // this.$emit('checkAllTodo', val);
        // this.checkAllTodo(val);
      }
    }
  },
  methods: {
    // checkAll(e) {
    //   this.checkAllTodo(e.target.checked);
    // },
    clearDone() {
      if(!this.doneTotal) {
        alert('没有已完成的任务！')
      } else {
        if(confirm('确定清除吗？')) {
          this.$emit('clearDoneTodo');
          // this.clearDoneTodo();
        }
      }
    }
  }
}
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>