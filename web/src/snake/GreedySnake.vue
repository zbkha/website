<template>
  <div>
    <div id="main">
      <Control></Control>
      <Stage></Stage>
      <Panel></Panel>
    </div>
    <Rank :list="list"></Rank>
  </div>
</template>

<script>
import PubSub from "pubsub-js"
import Stage from "./Stage"
import Panel from "./Panel"
import Control from "./Control"
import Rank from "./Rank"
export default {
  name: "GreedySnake",
  components: {
    Stage,
    Panel,
    Control,
    Rank
  },
  data() {
    return {
      list: []
    }
  },
  beforeMount() {
    this.$axios.get('/snake').then(res => {
      if(res) {
        PubSub.publish('show', '/snake')
        this.list = res.data
      }
    })
  }
}
</script>

<style scoped>
#main {
  box-sizing: border-box;
  width: 360px;
  height: 420px;
  background-color: #b7d4a8;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid black;
  border-radius: 40px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
}
</style>