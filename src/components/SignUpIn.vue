<template>
  <div class="modal" v-if="show" @click.self="$emit('fire')">
    <div class="box">
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
            >نام نویسی</a
          >
        </div>
        <div class="content">
          <transition name="fade" mode="out-in">
            <div v-if="activetab == 1" key="1">
              <form @submit.prevent="login">
                <div class="form-group">
                  <div class="input-row">
                    <input
                      type="text"
                      placeholder="شماره موبایل"
                      v-model="loginData.phone"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="گذرواژه"
                      v-model="loginData.password"
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
            <div class="error">{{ error }}</div>
              <form @submit.prevent="register">
                <div class="form-group">
                  <div class="input-row split">
                    <input
                      type="text"
                      placeholder="نام"
                      v-model="registerData.name"
                    />
                    <input
                      type="text"
                      placeholder="نام خانوادگی"
                      v-model="registerData.family"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="text"
                      placeholder="شماره موبایل"
                      v-model="registerData.phone"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="گذرواژه"
                      v-model="registerData.password"
                      :class="{ invalid: invalid }"
                      @keyup="confirmPassword"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="تکرار گذرواژه"
                      v-model="registerData.password_confirm"
                      :class="{ invalid: invalid }"
                      @keyup="confirmPassword"
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
                      >نام نویسی</Button
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
<style lang="scss" scoped>
.box {
  position: relative;
  min-height: 300px;
  padding: 10px;
}
.input-row {
  width: 100%;
  padding: 5px;
  margin: 2px 0;
  & input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: 1px solid #eee;
  }
}
.split {
  display: flex;
  justify-content: space-between;
  & input {
    width: 49%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.invalid {
  border:1px solid red !important;
}
</style>
<script>
import Button from "@/components/Button";

export default {
  components: {
    Button
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      activetab: 1,
      loginData: {
        phone: "",
        password: ""
      },
      registerData: {
        name: "",
        family: "",
        phone: "",
        password: "",
        password_confirm: ""
      },
      invalid: false,
      error : ''
    };
  },
  methods: {
    register() {
      if (
        this.invalid == false &&
        this.registerData.name != "" &&
        this.registerData.family != "" &&
        this.registerData.phone != ""
      ) {
        //
      }else{
        this.error = "لطفا همه فیلد ها را پر کنید."
        setTimeout(()=>{
          this.error = ''
        }, 3000);
      }
    },
    login() {},
    confirmPassword: function() {
      if (this.registerData.password !== this.registerData.password_confirm) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    }
  }
};
</script>
