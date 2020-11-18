<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="3" class="p-0 bg-dark text-light height-100">
          <side-bar :item="parent" v-for="(parent, index) in sideBarItem" :key="index"></side-bar>
        </b-col>
        <b-col cols="9" class="height-100" style="background: orange">
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
      sideBarItem: [
        {
          name: "بیمار",
          children: [
            { name: "لیست بیماران", path: "/test" },
            { name: "بیمارهای جدید", path: "/test" }
          ],
        },
        {
          name: "دکتر",
          children: [
            { name: "لیست دکتر ها", path: "/test" },
            { name: "دکتر های جدید", path: "/test" }
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
  .height-100{
    min-height: calc(100vh - 56px);
  }
</style>