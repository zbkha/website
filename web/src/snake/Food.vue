<template>
  <div id="food">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
class Food {
  constructor() {
    this.element = document.getElementById('food')
  }
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }
  change(left, top) {
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}
export default {
  name: "Food",
  data() {
    return {
      food: new Food()
    }
  }
}
</script>

<style scoped>
#food {
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  position: absolute;
  left: 40px;
  top: 100px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
}
#food div {
  box-sizing: border-box;
  width: 4px;
  height: 4px;
  background-color: black;
  transform: rotate(45deg);
}
</style>