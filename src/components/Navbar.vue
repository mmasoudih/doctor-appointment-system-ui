<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/" tag="b-nav-item">صفحه اصلی</router-link>
        <div v-if="authenticated">
          <router-link to="/panel" tag="b-nav-item">ورود به پنل</router-link>
        </div>
      </b-navbar-nav>

      <!-- left aligned nav items -->
      <b-navbar-nav class="mr-auto">
        <div v-if="!authenticated">
          <b-button squared v-b-modal.modal-lg variant="outline-success ml-2"
            >ورود / نام نویسی</b-button
          >
        </div>
        <div v-if="authenticated">
          <b-button
            squared
            variant="outline-info ml-2"
            :to="{ name: 'completeProfile' }"
            >تکمیل پروفایل</b-button
          >
          <b-button squared variant="outline-danger ml-2 " @click="logout"
            >خروج از حساب</b-button
          >
        </div>
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
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    authenticated() {
      return this.$store.getters.authenticated;
    },
  },
};
</script>
