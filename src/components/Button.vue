<template>
  <div>
    <button
      :class="{ outline: outline, block: block }"
      :style="{
        borderRadius: radius + 'px',
        backgroundColor: bg,
        color: color
      }"
    >
      <div v-if="loading">
        loading
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </button>
  </div>
</template>
<style scoped>
button {
  padding: 8px 10px;
  margin: 8px 3px;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
  border: transparent;
  outline: none;
}
.block {
  width: 100%;
  display: block;
}
.radius {
  border-radius: 5px;
}
.outline {
  border: 2px solid red;
}
</style>
<script>
export default {
  props: {
    loading: Boolean,
    block: Boolean,
    radius: Number,
    outline: Boolean,
    bg: String,
    color: String
  }
};
</script>
