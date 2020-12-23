<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <demo></demo>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
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

</style>
