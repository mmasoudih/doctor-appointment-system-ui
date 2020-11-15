<template>
  <div class="modal" v-if="show" @click.self="$emit('fire')">
    <div class="box">
      <div id="tabs">
        <div class="tabs">
          {{ loginLoading }}
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
                      :loading="loginLoading"
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
              <form @submit.prevent="register">
                <div class="form-group">
                  <div class="input-row split">
                    <input
                      type="text"
                      placeholder="نام"
                      v-model.trim="registerData.name"
                    />
                    <input
                      type="text"
                      placeholder="نام خانوادگی"
                      v-model.trim="registerData.family"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="text"
                      placeholder="شماره موبایل"
                      v-model.trim="registerData.phone"
                      maxlength="11"
                      @keyup="validatePhone"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="گذرواژه"
                      v-model.trim.lazy="registerData.password"
                    />
                  </div>
                  <div class="input-row">
                    <input
                      type="password"
                      placeholder="تکرار گذرواژه"
                      v-model.trim.lazy="registerData.password_confirm"
                    />
                  </div>

                  <div class="input-row">
                    <Button
                      :loading="loading"
                      :block="true"
                      :radius="15"
                      :outline="false"
                      bg="#050401"
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
    border: 1px solid #979797;
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
</style>
<script>
import Button from "@/components/Button";
import axios from "../axios";
import Noty from "noty";

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
      loading: false,
      phoneInvalid: false,
      shortPassword: false
    };
  },
  methods: {
    register() {
      if (
        this.registerData.name != "" &&
        this.registerData.family != "" &&
        this.registerData.phone != "" &&
        this.registerData.password != "" &&
        this.registerData.password_confirm != "" &&
        this.shortPassword == false
      ) {
        if (this.phoneInvalid) {
          this.noty({
            message: "شماره موبایل اشتباه است",
            type: "error"
          });
        } else {
          this.loading = true;
          const formData = {
            name: this.registerData.name,
            family: this.registerData.family,
            phone: this.registerData.phone,
            password: this.registerData.password
          };
          axios
            .post("/auth/register", formData)
            .then(res => {
              console.log(res.status);
              this.loading = false;
              this.noty({
                message: res.data.message,
                type: "success"
              });
            })
            .catch(async err => {
              this.loading = false;
              let errors = await err.response.data;
              Object.entries(errors).map(e => {
                this.noty({
                  message: e[1][0],
                  type: "info"
                });
              });
            });
        }
      } else {
        this.noty({
          message: "همه فیلد ها را پر کنید",
          type: "error"
        });
      }
    },
    login() {
      this.$store.commit("activeLoading");
      this.$store.dispatch("login", this.loginData);
    },
    confirmPassword: function() {
      if (this.registerData.password != this.registerData.password_confirm) {
        this.noty({
          message: "گذرواژه و تکرار آن یکسان نیست",
          type: "warning"
        });
      }
    },
    validatePhone() {
      const pattern = /^09[0|1|2|3|9][0-9]{8}$/;
      let phone = this.registerData.phone;
      if (phone.length == 11) {
        let isValidPhone = pattern.test(phone);
        if (!isValidPhone) {
          this.noty({ message: "شماره موبایل اشتباه است", type: "warning" });
          this.noty({ message: "صفحه کلید را انگلیسی کنید", type: "info" });

          this.phoneInvalid = true;
        } else {
          this.phoneInvalid = false;
        }
      } else {
        this.phoneInvalid = true;
      }
    },
    validatePassword() {
      let password = this.registerData.password;
      let password_confrim = this.registerData.password_confirm;
      if (password.length < 8 || password_confrim < 8) {
        this.noty({ message: "طول گذرواژه کوتاه است", type: "warning" });
        this.shortPassword = true;
      }
    },
    noty({ message, type }) {
      new Noty({
        text: message,
        timeout: 4000,
        type: type,
        layout: "bottomLeft"
      }).show();
    }
  },
  computed: {
    loginLoading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    registerData: {
      handler: function(newVal) {
        if (
          newVal.password !== newVal.password_confirm &&
          newVal.password != "" &&
          newVal.password_confirm != ""
        ) {
          this.validatePassword();
          this.confirmPassword();
        }
      },
      deep: true
    }
  }
};
</script>
