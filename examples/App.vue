<template>
  <div id="app">
    <div id="nav">
      <!--<img alt="Vue logo" src="./assets/logo.png">-->
      <!--<demo></demo>-->
      <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
      <!--<router-link to="/rich">rich公式编辑器（正在开发）</router-link>|-->
      <!--<router-link to="/table">table</router-link>|-->
      <!--<router-link to="/">form</router-link>-->
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import demo from './components/demo.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
      demo
  }
}
</script>

<style>
#app{
  min-height: 100vh;
}
</style>
