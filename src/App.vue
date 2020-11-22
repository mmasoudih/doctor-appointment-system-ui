<template>
  <div id="app">
    <app-navbar />
    <transition name="page">
      <router-view />
    </transition>
  </div>
</template>
<script>
import AppNavbar from "@/components/Navbar";
import JWT from "./router/jwt";
export default {
  components: {
    AppNavbar
  },
  created() {
    if (localStorage.token) {
      const jwtPayload = JWT(localStorage.token);
      if (jwtPayload.exp < Date.now() / 1000) {
        // token expired
        localStorage.removeItem("token");
      }
    }
  }
};
</script>
<style lang="scss">
@import "./scss/styles.scss";
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
@for $i from 1 through 5 {
  $enter-delay: 400ms;

  .page-enter-active {
    overflow: hidden;
    transition: transform $enter-delay cubic-bezier(0.4, 0.1, 0.7, 0.95);

    .enter-#{$i} {
      transition: 300ms cubic-bezier(0.1, 0.7, 0.6, 0.9);
      transition-property: opacity, transform;
      transition-delay: #{120ms * $i + $enter-delay};
    }
  }

  .page-enter {
    transform: translateX(100%);

    .enter-#{$i} {
      opacity: 0;
      transform: translateX(50px);
    }
  }

  .page-leave-active {
    display: block;
  }
}
</style>
