<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/" tag="b-nav-item">صفحه اصلی</router-link>
        <router-link to="/" tag="b-nav-item">همین جوری یه چیزی</router-link>
      </b-navbar-nav>

      <!-- left aligned nav items -->
      <b-navbar-nav class="mr-auto">
        <b-button squared  v-b-modal.modal-lg variant="outline-warning ml-2" @click="show = !show">ورود / نام نویسی</b-button>
        <b-button squared variant="outline-success">آیا پزشک هستید؟</b-button>
      
          <login-register-modal />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
