<template>
  <div>
    <button
      :class="{ outline: outline, block: block }"
      :style="{
        borderRadius: radius + 'px',
        backgroundColor: bg,
        color: color
      }"
      :disabled="loading"
    >
      <div v-if="loading">
        <div class="multi-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </button>
  </div>
</template>
<style lang="scss" scoped>
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

@keyframes ripple {
  from {
    transform: scale(0);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}

.multi-ripple {
  width: 20px;
  height: 20px;
  margin: 0 auto;

  div {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 0.3rem solid #979fd0;
    animation: 1.5s ripple infinite;

    &:nth-child(2) {
      animation-delay: 0.5s;
    }
  }
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
