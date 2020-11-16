<template>
  <div>
    <b-modal id="modal-lg" size="lg" :hide-footer="true">
      <b-container>
        <b-row>
          <b-col class="p-0"
            ><b-button squared block variant="primary" @click="activetab = 1"
              >ورود</b-button
            ></b-col
          >
          <b-col class="p-0"
            ><b-button squared block variant="secondary" @click="activetab = 2"
              >نام نویسی</b-button
            ></b-col
          >
        </b-row>
        <transition name="fade" mode="out-in">
          <div role="group" v-if="activetab == 1" :key="1">
            <b-form-group>
              <b-form-input
                v-model="registerData.phone"
                :state="!$v.registerData.phone.$error ? null : false"
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
                v-model="registerData.password"
                :state="!$v.registerData.password.$error ? null : false"
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
            </b-form-group>

            <b-button
              block
              squared
              variant="outline-primary"
              @click="login"
              :disabled="loading"
            >
              <span v-if="!loading"> ورود</span>
              <div v-if="loading" class="d-flex justify-content-center">
                <b-spinner></b-spinner>
              </div>
            </b-button>
          </div>

          <div role="group" v-if="activetab == 2" :key="2">
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
              <b-form-invalid-feedback id="phone-live-feedback">
                شماره موبایل نمیتواند خالی باشد.
              </b-form-invalid-feedback>

              <b-form-input
                v-model="registerData.password"
                :state="!$v.registerData.password.$error ? null : false"
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
                v-if="!$v.registerData.password.minLenght"
              >
                گذروازه باید حداقل
                {{ $v.registerData.password.$params.minLength.min }}
                کاراکتر باشد..
              </b-form-invalid-feedback>

              <b-form-input
                v-model="registerData.password_confirm"
                :state="!$v.registerData.password_confirm.$error ? null : false"
                aria-describedby="password-confirm-live-feedback password-req-live-feedback"
                placeholder="تکرار گذرواژه"
                class="rounded-0 mt-2"
                trim
                type="password"
              ></b-form-input>

              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback
                id="password-req-live-feedback"
                v-if="!$v.registerData.family.required"
              >
                گذرواژه نمیتواند خالی باشد.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                id="password-confirm-live-feedback"
                v-if="!$v.registerData.password_confirm.sameAs"
              >
                تکرار گذرواژه یکسان نیست.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button
              block
              squared
              variant="outline-success"
              @click="register"
              :disabled="loading"
            >
              <span v-if="!loading"> نام نویسی</span>
              <div v-if="loading" class="d-flex justify-content-center">
                <b-spinner></b-spinner>
              </div>
            </b-button>
          </div>
        </transition>
      </b-container>
    </b-modal>
  </div>
  <!--<div class="modal" v-if="show" @click.self="$emit('fire')">
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
  </div>-->
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
// import Button from "@/components/Button";
import axios from "../axios";
import Noty from "noty";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  components: {
    // Button
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      activetab: 1,
      loginData: {
        phone: "",
        password: "",
      },
      registerData: {
        name: "",
        family: "",
        phone: "",
        password: "",
        password_confirm: "",
      },
      loading: false,
      phoneInvalid: false,
      shortPassword: false,
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
        phone: this.registerData.phone,
        password: this.registerData.password,
      };
      axios
        .post("/auth/register", formData)
        .then((res) => {
          console.log(res.status);
          this.loading = false;
          this.noty({
            message: res.data.message,
            type: "success",
          });
        })
        .catch(async (err) => {
          this.loading = false;
          let errors = await err.response.data;
          Object.entries(errors).map((e) => {
            this.noty({
              message: e[1][0],
              type: "info",
            });
          });
        });
    },
    login() {
      this.$store.commit("activeLoading");
      this.$store.dispatch("login", this.loginData);
    },
    noty({ message, type }) {
      new Noty({
        text: message,
        timeout: 4000,
        type: type,
        layout: "bottomLeft",
      }).show();
    },
  },
  computed: {
    loginLoading() {
      return this.$store.getters.loading;
    },
  },
  validations: {
    registerData: {
      name: { required },
      family: { required },
      phone: { required },

      password: {
        required,
        minLength: minLength(8),
      },
      password_confirm: {
        password_confirm: sameAs("password"),
        required,
      },
    },
  },
};
</script>
