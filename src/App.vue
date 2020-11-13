<template>
  <div id="app">
    <app-navbar />
    <router-view />
  </div>
</template>
<script>
import AppNavbar from '@/components/Navbar'
export default {
  components:{
    AppNavbar
  }
}
</script>
<style lang="scss">
@import './scss/styles.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
