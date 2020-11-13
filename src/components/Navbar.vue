<template>
  <div class="app-navbar flex space-between">
    <nav>
      <router-link to="/" tag="a">صفحه اصلی</router-link>
      <router-link to="/" tag="a">همین جوری یه چیزی</router-link>
    </nav>
    <div>
      <a class="app-btn" @click="show = !show">
        ورود / عضویت
      </a>
      <a class="app-btn">
        آیا پزشک هستید؟
      </a>
    </div>
    <login-register-modal :show="show" @fire="fire"/>
  </div>
</template>
<script>
import LoginRegisterModal from "./SignUpIn";

export default {
  components: {
    LoginRegisterModal
  },
  data() {
    return {
      show: false
    }
  },
  methods:{
    fire(){
      this.show = false;
    }
  }
};
</script>
