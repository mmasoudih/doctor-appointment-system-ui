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
                userInfo.user.profile.avatar == null
                  ? userInfo.user.user.profile_photo_url
                  : 'http://127.0.0.1:8000/storage/'+userInfo.user.profile.avatar
              "
              size="6rem"
              v-if="contentReady"
            ></b-avatar>
            <p class="p-4 text-dark text-center font-weight-light h4" v-if="contentReady">
              {{ userInfo.user.user.name }} {{ userInfo.user.user.family }}
            </p>
            <!-- {{userInfo.user.user.name}} -->
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
      contentReady: false,
      is_doctor: false,
      sideBarItem: [
        {
          name: "ویرایش پروفایل",
          path:{name: "completeProfile"},
          icon: "b-icon-person-bounding-box"
        },
        {
          name: "مدیریت روز های فعالیت",
          path: {name: "manageDays"},
          icon: "calendar2-check"
        },
        {
          name: "مدیریت تخصص ها",
          path: {name: "manageSpecialties"},
          icon: "receipt"
        }
      ]
    };
  },
 mounted() {
   let test = this.$store.dispatch("setUserLogin")
   test.then(()=>{

     this.contentReady = true;
     this.is_doctor = this.userInfo.is_doctor
   })
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
