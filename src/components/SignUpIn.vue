<template>
  <div :class="['modal',{'modal-active': show}]" v-if="show">
      <div class="box">
        ورود 
        <a href="#" @click="$emit('fire')">x</a>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean
  }
}
</script>