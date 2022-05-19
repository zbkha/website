<template>
  <div id="stage">
    <Snake></Snake>
    <Food></Food>
  </div>
</template>

<script>
import Snake from "./Snake"
import Food from "./Food"
export default {
  name: "stage",
  components: {
    Snake,
    Food
  }
}
</script>

<style scoped>
#stage {
  box-sizing: border-box;
  width: 304px;
  height: 304px;
  border: 2px solid black;
  position: relative;
}
</style>