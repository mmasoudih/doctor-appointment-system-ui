<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col
          cols="3"
          class="p-0 bg-transparent text-light height-100 d-none d-sm-none d-lg-block d-md-block"
          id="sidenav"
        >
          <b-col cols="12" class="mt-3 mb-2 mx-auto text-center">
            <b-avatar
              :src="
                userInfo.user.avatar == null
                  ? userInfo.user.user.profile_photo_url
                  : userInfo.user.avatar
              "
              size="6rem"
            ></b-avatar>
            <p class="p-4 text-dark text-center font-weight-light h4">
              {{ userInfo.user.user.name }} {{ userInfo.user.user.family }}
            </p>
          </b-col>
          <side-bar
            :item="parent"
            v-for="(parent, index) in sideBarItem"
            :key="index"
          ></side-bar>
        </b-col>
        <b-col cols="9" class="height-100">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import SideBar from "../../components/Sidebar";
export default {
  components: {
    SideBar
  },
  data() {
    return {
      sideBarItem: [
        {
          name: "بیمار",
          children: [
            { name: "لیست بیماران", path: "/test" },
            { name: "بیمارهای جدید", path: "/test" }
          ]
        },
        {
          name: "دکتر",
          children: [
            { name: "لیست دکتر ها", path: "/test" },
            { name: "دکتر های جدید", path: "/test" }
          ]
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("setUserLogin");
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>
<style scoped>
.height-100 {
  min-height: calc(100vh - 56px);
}
#sidenav {
  background: url("../../assets/bg.jpg");
}
</style>
