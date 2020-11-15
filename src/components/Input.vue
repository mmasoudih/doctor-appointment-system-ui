<template>
  <div>
    <div class="input-row">
      <input :type="type" :placeholder="placeholder" :value="value" />
    </div>
  </div>
</template>
<style scoped>
.input-row {
  width: 100%;
  padding: 5px;
  margin: 2px 0;
}
input {
  width: 100%;
  padding: 10px;
  outline: none;
}
</style>
<script>
export default {
  props: ["type", "placeholder", "value"]
};
</script>
