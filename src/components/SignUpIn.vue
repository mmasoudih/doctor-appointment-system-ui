<template>
  <div>
    <b-modal id="modal-lg" size="lg" :hide-footer="true">
      <b-container>
        <b-row>
          <b-col class="p-0"
            ><b-button
              squared
              block
              variant="primary"
              :class="{ 'active-class': activetab == 1 }"
              @click="activetab = 1"
              >ورود</b-button
            ></b-col
          >
          <b-col class="p-0"
            ><b-button
              squared
              block
              variant="secondary"
              :class="{ 'active-class': activetab == 2 }"
              @click="activetab = 2"
              >نام نویسی</b-button
            ></b-col
          >
        </b-row>
        <transition name="fade" mode="out-in">
          <div role="group" v-if="activetab == 1" :key="1">
            <b-form @submit.prevent="login">
              <b-form-group>
                <b-form-input
                  v-model="loginData.phone"
                  :state="!$v.loginData.phone.$error ? null : false"
                  aria-describedby="phone-live-feedback"
                  placeholder="شماره موبایل"
                  class="rounded-0 mt-3 mb-2"
                  trim
                ></b-form-input>

                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="phone-live-feedback">
                  شماره موبایل نمیتواند خالی باشد.
                </b-form-invalid-feedback>

                <b-form-input
                  v-model="loginData.password"
                  :state="!$v.loginData.password.$error ? null : false"
                  aria-describedby="password-live-feedback password-min-live-feedback"
                  placeholder="گذرواژه"
                  class="rounded-0 mt-2 mb-2"
                  trim
                  type="password"
                ></b-form-input>

                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback
                  id="password-live-feedback"
                  v-if="!$v.loginData.password.required"
                >
                  گذرواژه نمیتواند خالی باشد.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button
                block
                squared
                variant="outline-primary"
                type="submit"
                :disabled="loginLoading"
              >
                <span v-if="!loginLoading"> ورود</span>
                <div v-if="loginLoading" class="d-flex justify-content-center">
                  <b-spinner></b-spinner>
                </div>
              </b-button>
            </b-form>
          </div>

          <div role="group" v-if="activetab == 2" :key="2">
            <b-form @submit.prevent="register">
              <b-form-group>
                <b-form-input
                  v-model="registerData.name"
                  :state="!$v.registerData.name.$error ? null : false"
                  aria-describedby="name-live-feedback"
                  placeholder="نام"
                  class="ml-1 mt-2 mb-2 rounded-0"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback
                  id="name-live-feedback"
                  v-if="!$v.registerData.name.required"
                >
                  نام نمیتواند خالی باشد.
                </b-form-invalid-feedback>

                <b-form-input
                  v-model="registerData.family"
                  :state="!$v.registerData.family.$error ? null : false"
                  aria-describedby="family-live-feedback"
                  placeholder="نام خانوادگی"
                  class="rounded-0 mt-2 mb-2"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback
                  id="family-live-feedback"
                  v-if="!$v.registerData.family.required"
                >
                  نام خانوادگی نمیتواند خالی باشد.
                </b-form-invalid-feedback>

                <b-form-input
                  v-model="registerData.phone"
                  :state="!$v.registerData.phone.$error ? null : false"
                  aria-describedby="phone-live-feedback"
                  placeholder="شماره موبایل"
                  class="rounded-0 mb-2"
                  trim
                ></b-form-input>

                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback
                  id="phone-live-feedback"
                  v-if="!$v.registerData.phone.required"
                >
                  شماره موبایل نمیتواند خالی باشد.
                </b-form-invalid-feedback>

                <b-form-input
                  v-model="registerData.password"
                  :state="$v.registerData.password.$error ? false : null"
                  aria-describedby="password-live-feedback password-min-live-feedback"
                  placeholder="گذرواژه"
                  class="rounded-0 mt-2 mb-2"
                  trim
                  type="password"
                ></b-form-input>

                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback
                  id="password-live-feedback"
                  v-if="!$v.registerData.password.required"
                >
                  گذرواژه نمیتواند خالی باشد.
                </b-form-invalid-feedback>
                <b-form-invalid-feedback
                  id="password-min-live-feedback"
                  v-if="!$v.registerData.password.minLength"
                >
                  گذروازه باید حداقل
                  {{ $v.registerData.password.$params.minLength.min }}
                  کاراکتر باشد..
                </b-form-invalid-feedback>

                <b-form-input
                  v-model="registerData.password_confirm"
                  :state="
                    $v.registerData.password_confirm.$error ? false : null
                  "
                  aria-describedby="password-confirm-live-feedback"
                  placeholder="تکرار گذرواژه"
                  class="rounded-0 mt-2"
                  trim
                  type="password"
                ></b-form-input>

                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback
                  id="password-confirm-live-feedback"
                  v-if="!$v.registerData.password_confirm.password_confirm"
                >
                  تکرار گذرواژه یکسان نیست.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-checkbox v-model="isDoctor">آیا پزشک هستید؟</b-checkbox>

              <b-button
                block
                squared
                variant="outline-success"
                type="submit"
                :disabled="loading"
              >
                <span v-if="!loading"> نام نویسی</span>
                <div v-if="loading" class="d-flex justify-content-center">
                  <b-spinner></b-spinner>
                </div>
              </b-button>
            </b-form>
          </div>
        </transition>
      </b-container>
    </b-modal>
  </div>
</template>
<style lang="scss" scoped>
.active-class {
  opacity: 0.7;
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
// import Button from "@/components/Button";
import axios from "../axios";
import Noty from "../plugins/notification";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
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
      shortPassword: false,
      userRegisterUrl: "/auth/register",
      doctorRegisterUrl: "/auth/doctor/register",
      isDoctor: false
    };
  },
  methods: {
    register() {
      this.$v.registerData.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.registerData.$pending || this.$v.registerData.$error) return;
      // to form submit after this

      this.loading = true;
      const formData = {
        name: this.registerData.name,
        family: this.registerData.family,
        phone: this.toEnglishDigits(this.registerData.phone),
        password: this.toEnglishDigits(this.registerData.password)
      };
      axios
        .post(
          this.isDoctor ? this.doctorRegisterUrl : this.userRegisterUrl,
          formData
        )
        .then(res => {
          this.loading = false;
          Noty({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(async err => {
          this.loading = false;
          let errors;
          if (err.response) {
            errors = await err.response.data;
            Object.entries(errors).map(e => {
              Noty({
                message: e[1][0],
                type: "info"
              });
            });
          }
        });
    },
    login() {
      this.$v.loginData.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.loginData.$pending || this.$v.loginData.$error) return;
      // to form submit after this
      let loginData = {
        phone: this.toEnglishDigits(this.loginData.phone),
        password: this.toEnglishDigits(this.loginData.password)
      };
      this.$store.commit("activeLoading");
      this.$store.dispatch("login", loginData);

      // console.log(test);
    },
    toEnglishDigits(str) {
      // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
      var e = "۰".charCodeAt(0);
      str = str.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
      });
      return str;
    }
  },
  computed: {
    loginLoading() {
      return this.$store.getters.loading;
    },
    authenticated() {
      return this.$store.getters.authenticated;
    }
  },
  watch: {
    authenticated(val) {
      if (val) {
        this.$bvModal.hide("modal-lg");
      }
      // console.log(val);
    }
  },
  validations: {
    loginData: {
      phone: { required },
      password: { required }
    },
    registerData: {
      name: { required },
      family: { required },
      phone: { required },

      password: {
        required,
        minLength: minLength(8)
      },
      password_confirm: {
        required,
        password_confirm: sameAs("password")
      }
    }
  }
};
</script>
