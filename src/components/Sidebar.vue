<template>
  <div>
    <ul class="m-0">
      <div v-if="item.path">
        <router-link
          @click.self="toggle"
          :to="item.path ? item.path : ''"
          tag="a"
          :class="{ 'text-white-50': !isOpen, 'text-white': isOpen }"
          class="nav nav-link nav-item bg-dark p-3 m-0"
        >
          <b-icon :icon="item.icon"></b-icon>
          {{ item.name }}
        </router-link>
      </div>
      <div v-else>
        <a
          @click="toggle"
          :class="{ 'text-white-50': !isOpen, 'text-white': isOpen }"
          class="nav nav-link nav-item bg-dark p-3 m-0"
          >{{ item.name }}</a
        >
      </div>

      <div v-if="isOpen">
        <router-link
          :to="child.path"
          v-for="(child, index) in item.children"
          :key="index"
          tag="a"
          class="nav nav-link text-white p-2 bg-success"
          >{{ child.name }}</router-link
        >
      </div>
    </ul>
    <!-- <ul>
      <li>
      <div
        @click="toggle">
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <li
          class="item"
          v-for="(child, index) in item"
          :key="index"
        >
       {{child}}
          <p v-for="(p, index) in child " :key="index">{{ p }}</p>
        </li>
      </ul>
    </li>
    </ul> -->
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  created() {
    console.log(this.item);
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  computed: {
    // isFolder: function() {
    //   return this.item.children && this.item.children.length;
    // }
  },
  methods: {
    toggle: function() {
      // if (this.isFolder) {
      this.isOpen = !this.isOpen;
      // }
    }
  }
};
</script>
<style scoped>
.hover:hover {
  background: #696969 !important;
}
</style>
