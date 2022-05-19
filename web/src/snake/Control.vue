<template>
  <button @click="play" :disabled="isLock">开始游戏</button>
</template>

<script>
import Snake from "./Snake"
import Food from "./Food"
import Panel from "./Panel"
class Control {
  direction = ''
  isLive = true
  constructor() {
    this.snake = Snake.data().snake
    this.food = Food.data().food
    this.scorePanel = Panel.data().panel
    this.init()
  }
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run()
  }
  keydownHandler(event) {
    if(this.checkTurn(event)) {
      return
    }
    this.direction = event.key
  }
  run() {
    let X = this.snake.X
    let Y = this.snake.Y
    switch(this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
    }
    this.checkEat(X, Y)
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      alert(e.message)
      this.isLive = false
    }
    if(this.isLive) {
      this.delay = setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }
  }
  checkEat(X, Y) {
    if(this.food.X === X && this.food.Y === Y) {
      this.scorePanel.addScore()
      this.snake.addBody()
      this.food.change(this.confirmPosition()[0], this.confirmPosition()[1])
    }
  }
  checkTurn(event) {
    return ((this.direction === 'ArrowUp' || this.direction === 'Up') && (event.key === 'ArrowDown' || event.key === 'Down')) ||
        ((this.direction === 'ArrowDown' || this.direction === 'Down') && (event.key === 'ArrowUp' || event.key === 'Up')) ||
        ((this.direction === 'ArrowLeft' || this.direction === 'Left') && (event.key === 'ArrowRight' || event.key === 'Right')) ||
        ((this.direction === 'ArrowRight' || this.direction === 'Right') && (event.key === 'ArrowLeft' || event.key === 'Left'))
  }
  checkBodyFood(left, top) {
    for(let i = 0; i < this.snake.bodies.length; i++) {
      if(this.snake.bodies[i].offsetLeft === left && this.snake.bodies[i].offsetTop === top) {
        return 0
      }
    }
    return 1
  }
  confirmPosition() {
    let left = Math.round(Math.random() * 29) * 10
    let top = Math.round(Math.random() * 29) * 10
    while(this.checkBodyFood(left, top) === 0) {
      left = Math.round(Math.random() * 29) * 10
      top = Math.round(Math.random() * 29) * 10
    }
    return [left, top]
  }
}
export default {
  name: "Control",
  data() {
    return {
      isLock: false,
      control: null
    }
  },
  methods: {
    play() {
      this.control = new Control()
      console.log(this.control.scorePanel.score)
      this.isLock = true
    },
    upload() {
      const score = {score: this.control.scorePanel.score}
      this.$axios.post('/snake', score)
    }
  },
  watch: {
    'control.isLive': {
      deep: false,
      handler(newVal) {
        console.log(123)
        if(!newVal) {
          clearTimeout(this.control.delay)
          this.upload()
          this.isLock = false
        } else {
          this.control.scorePanel.score = 0
          this.control.scorePanel.level = 1
        }
      }
    }
  },
  beforeDestroy() {
    if(this.control) {
      clearTimeout(this.control.delay)
    }
  }
}
</script>

<style scoped>
button {
  font: bold 15px 'Courier';
}
</style>