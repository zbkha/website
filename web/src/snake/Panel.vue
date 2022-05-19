<template>
  <div id="score-panel">
    <div>
      分数:<span id="score">{{panel.score}}</span>
    </div>
    <div>
      等级:<span id="level">1</span>
    </div>
  </div>
</template>

<script>
class Panel {
  score = 0
  level = 1
  constructor(maxLevel = 10, upScore = 10) {
    this.maxLevel = maxLevel
    this.upScore = upScore
    this.scoreEle = document.getElementById('score')
    this.levelEle = document.getElementById('level')
  }
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    if(this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if(this.level < this.maxLevel)
      this.levelEle.innerHTML = ++this.level + ''
  }
}
export default {
  name: "Panel",
  data() {
    return {
      panel: new Panel()
    }
  }
}
</script>

<style scoped>
#score-panel {
  font: bold 20px 'Courier';
  box-sizing: border-box;
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>