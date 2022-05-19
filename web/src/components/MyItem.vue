<template>
<!--  <transition name="todo" appear>-->
    <li>
      <label>
        <input type="checkbox" :checked="todo.done" @change="handleCheck"/>
        <!--      <input type="checkbox" v-model="todo.done">-->
        <span v-show="!todo.isEdit">{{todo.title}}</span>
        <input ref="inputTitle" v-show="todo.isEdit" type="text" :value="todo.title" @blur="handleBlur">
      </label>
      <button class="btn btn-danger" @click="handleDelete">删除</button>
      <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit">编辑</button>
    </li>
<!--  </transition>-->
</template>

<script>
export default {
  name: "MyItem",
  props: ['todo',/* 'checkTodo', 'deleteTodo'*/],
  methods: {
    handleCheck() {
      this.$bus.$emit('checkTodo', this.todo);
      // this.checkTodo(id);
    },
    handleDelete() {
      if(confirm('确定删除吗？')) {
        this.$bus.$emit('deleteTodo', this.todo.id);
        // this.deleteTodo(id);
      }
    },
    handleEdit() {
      if (Object.prototype.hasOwnProperty.call(this.todo, 'isEdit')) {
        this.todo.isEdit = true;
      } else {
        this.$set(this.todo, 'isEdit', true);
      }
      this.$nextTick(function() {
        this.$refs.inputTitle.focus();
      })
      // setTimeout(() => {
      //   this.$refs.inputTitle.focus();
      // })
    },
    handleBlur(e) {
      this.todo.isEdit = false;
      if(!e.target.value.trim()) return alert('输入不能为空');
      this.$bus.$emit('updateTodo', this.todo, e.target.value);
      // this.todo.title = e.target.value;
    }
  }
}
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background-color: #ddd;
  }
  li:hover button {
    display: block;
  }
  /*.todo-enter-active {*/
  /*  animation: cogo 1s;*/
  /*}*/
  /*.todo-leave-active {*/
  /*  animation: cogo 1s reverse;*/
  /*}*/
  /*@keyframes cogo {*/
  /*  from {*/
  /*    transform: translateX(-100%);*/
  /*  }*/
  /*  to {*/
  /*    transform: translateX(0);*/
  /*  }*/
  /*}*/
</style>