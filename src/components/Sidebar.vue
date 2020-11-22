<template>
  <div>
    <ul>
      <li @click.self="toggle">{{ item.name }}[{{ isOpen ? "-" : "+" }}]</li>
      <div v-if="isOpen">
        <router-link
          :to="child.path"
          v-for="(child, index) in item.children"
          :key="index"
          tag="li"
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
