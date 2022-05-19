<template>
  <div v-if="found">
    <Navigation :profile="profile" :actCom="actCom"></Navigation>
    <h1>欢迎，{{profile.account}}</h1>
    <router-view></router-view>
    <Logout></Logout>
  </div>
</template>

<script>
import PubSub from "pubsub-js"
import Navigation from "../views/Navigation"
import Logout from "../views/Logout"
export default {
  name: "Home",
  components: {
    Navigation,
    Logout
  },
  data() {
    return {
      found: false,
      profile: {},
      actCom: ''
    }
  },
  methods: {
    show(_, component) {
      this.actCom = component
    }
  },
  beforeMount() {
    this.$axios.get('/').then(res => {
      if(res) {
        this.pubId = PubSub.subscribe('show', this.show)
        PubSub.publish('show', '/home')
        this.found = true
        this.profile = res.data
      }
    })
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.pubId)
  }
}
</script>

<style scoped>
  h1 {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>