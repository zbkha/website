<template>
  <div id="snake">
    <div></div>
  </div>
</template>

<script>
class Snake {
  constructor() {
    this.element = document.getElementById('snake')
    this.head = document.querySelector('#snake > div')
    this.bodies = this.element.getElementsByTagName('div')
  }
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  set X(value) {
    if(this.X === value) {
      return
    }
    if(value < 0 || value > 290) {
      throw new Error('Game Over！')
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }
  set Y(value) {
    if(this.Y === value) {
      return
    }
    if(value < 0 || value > 290) {
      throw new Error('Game Over!')
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
    let added = this.bodies[this.bodies.length - 1]
    added.style.boxSizing = 'border-box'
    added.style.width = '10px'
    added.style.height = '10px'
    added.style.backgroundColor = 'black'
    added.style.border = '1px solid #b7d4a8'
    added.style.position = 'absolute'
  }
  moveBody() {
    for(let i = this.bodies.length - 1; i > 0; i--) {
      let X = this.bodies[i - 1].offsetLeft
      let Y = this.bodies[i - 1].offsetTop;
      this.bodies[i].style.left = X + 'px';
      this.bodies[i].style.top = Y + 'px';
    }
  }
  checkHeadBody() {
    for(let i = 4; i < this.bodies.length; i++) {
      let X = this.bodies[i].offsetLeft
      let Y = this.bodies[i].offsetTop
      if(X === this.head.offsetLeft && Y === this.head.offsetTop) {
        throw new Error('Game Over!')
      }
    }
  }
}
export default {
  name: "Snake",
  data() {
    return {
      snake: new Snake()
    }
  }
}
</script>

<style scoped>
#snake div {
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  background-color: black;
  border: 1px solid #b7d4a8;
  position: absolute;
}
</style>