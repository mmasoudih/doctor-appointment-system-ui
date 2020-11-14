<template>
  <div class="modal" v-if="show">
    <div class="box">
      <a href="#" class="close" @click="$emit('fire')">
        ×
      </a>
      <div id="tabs">
        <div class="tabs">
          <a
            href="#"
            @click="activetab = 1"
            :class="{ 'active-tab': activetab == 1 }"
            >ورود</a
          >
          <a
            href="#"
            @click="activetab = 2"
            :class="{ 'active-tab': activetab == 2 }"
            >عضویت</a
          >
        </div>
        <div class="content">
          <transition name="fade" mode="out-in">
            <div v-if="activetab == 1" key="1">
              <form @submit.prevent="submit">
                <div class="form-group">
                  <div class="input-row">
                    <input
                      type="text"
                      placeholder="شماره موبایل"
                      v-model="phone"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="گذرواژه"
                      v-model="password"
                    />
                  </div>

                  <div class="input-row">
                    <Button
                      :loading="false"
                      :block="true"
                      :radius="15"
                      :outline="false"
                      bg="#1bf01b"
                      color="white"
                      >ورود</Button
                    >
                  </div>
                </div>
              </form>
            </div>
         
            <div v-if="activetab == 2" key="2">
              <form @submit.prevent="submit">
                <div class="form-group">
                  <div class="input-row">
                    <input
                      type="text"
                      placeholder="شماره موبایل"
                      v-model="phone"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="گذرواژه"
                      v-model="password"
                    />
                  </div>

                  <div class="input-row">
                    <Button
                      :loading="false"
                      :block="true"
                      :radius="15"
                      :outline="false"
                      bg="#1bf01b"
                      color="white"
                      >ورود</Button
                    >
                  </div>
                </div>
              </form>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  position: relative;
  min-height: 300px;
  padding: 10px;
}
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
.close {
  position: absolute;
  top: 0;
  right: 0;
  text-decoration: none;
  border-radius: 50%;

  background: #1bf01b;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<script>
import Button from "@/components/Button";
// import Input from "@/components/Input"

export default {
  components: {
    Button,
    // Input
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      activetab: 1,
      phone: "",
      password: "",
      showw: true,
    };
  },
  methods: {
    submit() {},
  },
};
</script>
