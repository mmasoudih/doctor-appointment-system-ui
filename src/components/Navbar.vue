<template>
  <div class="app-navbar flex space-between">
    <nav>
      <router-link to="/" tag="a">صفحه اصلی</router-link>
      <router-link to="/" tag="a">همین جوری یه چیزی</router-link>
    </nav>
    <div>
      <a class="app-btn radius " @click="show = !show">
        ورود / عضویت
      </a>
      <a class="app-btn radius">
        آیا پزشک هستید؟
      </a>
    </div>
    <transition name="fade">
      <login-register-modal v-if="show" :show="show" @fire="fire" />
    </transition>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<script>
import LoginRegisterModal from "./SignUpIn";

export default {
  components: {
    LoginRegisterModal,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    fire() {
      this.show = false;
    },
  },
};
</script>
