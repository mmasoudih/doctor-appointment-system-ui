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
            <b-skeleton
              class="p-5 mx-auto mt-2 mb-4"
              type="avatar"
              v-if="!contentReady"
            ></b-skeleton>
            <template v-if="contentReady">
              <b-avatar
                :src="
                  userInfo.user.user.profile.avatar == null
                    ? userInfo.user.user.profile_photo_url
                    : 'http://mohamadmasoudi.ir/storage/' +
                      userInfo.user.user.profile.avatar
                "
                size="6rem"
              ></b-avatar>
            </template>
            <b-skeleton v-if="!contentReady"></b-skeleton>
            <template v-if="contentReady">
              <p class="p-4 text-dark text-center font-weight-light h4">
                {{ userInfo.user.user.name }} {{ userInfo.user.user.family }}
              </p>
            </template>
          
          </b-col>
          
          <template v-if="contentReady">
            <div
              v-if="userInfo.user.user.is_admin && userInfo.is_doctor == false"
            >
              <side-bar
                :item="parent"
                v-for="(parent, index) in adminMenu"
                :key="index"
              ></side-bar>
            </div>
            <div v-if="userInfo.is_doctor && userInfo.is_active == 1">
              <side-bar
                :item="parent"
                v-for="(parent, index) in doctorMenu"
                :key="index"
              ></side-bar>
            </div>
            <div v-if="userInfo.is_doctor && userInfo.is_active == 0">
              لطفا پروفایل خود را تکمیل کنید.
            </div>
            <div v-if="!userInfo.user.user.is_admin &&  userInfo.is_doctor == false">
              <side-bar
                :item="parent"
                v-for="(parent, index) in userMenu"
                :key="index"
              ></side-bar>
            </div>
          </template>
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
    SideBar,
  },
  data() {
    return {
      contentReady: false,
      doctorMenu: [
        {
          name: "ویرایش پروفایل",
          path: { name: "completeProfile" },
          icon: "b-icon-person-bounding-box",
        },
        {
          name: "مدیریت روز های فعالیت",
          path: { name: "manageDays" },
          icon: "calendar2-check",
        },
        {
          name: "مدیریت تخصص ها",
          path: { name: "manageSpecialties" },
          icon: "receipt",
        },
      ],
      adminMenu: [
        {
          name: "لیست دکترها",
          path: { name: "manageDoctors" },
          icon: "b-icon-person",
        },
      ],
      userMenu: [
        {
          name: "لیست ",
          path: { name: "completeProfile" },
          icon: "b-icon-person-bounding-box",
        },
        {
          name: "گرفتن نوبت ",
          path: { name: "getTurn" },
          icon: "b-icon-person-bounding-box",
        },
      ],
    };
  },
  mounted() {
    let test = this.$store.dispatch("setUserLogin");
    test.then(() => {
      this.contentReady = true;
    });
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
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
