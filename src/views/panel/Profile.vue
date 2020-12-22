<template>
  <div>
    <b-col cols="7" class="mx-auto">
      <b-row>
        <b-col cols="3" sm="3" class="mt-3 mb-2 mx-auto">
          <b-skeleton class="p-5" type="avatar" v-if="!dataReady"></b-skeleton>
          <template v-if="dataReady">
            <b-avatar
              :src="
                userInfo.user.user.profile.avatar == null
                  ? userInfo.user.user.profile_photo_url
                  : 'http://mohamadmasoudi.ir/storage/' +
                    userInfo.user.user.profile.avatar
              "
              size="6rem"
            ></b-avatar>
          </template>
        </b-col>
      </b-row>
      <b-form @submit="onSubmit" v-if="show">
        <!-- <pre
          >{{ userInfo }}
        
          </pre
        > -->
        <b-form-group label="نام :">
          <b-form-input
            :value="userInfo.user.user.name"
            type="text"
            required
            placeholder="نام"
            :disabled="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="نام خانوادگی :‌">
          <b-form-input
            type="text"
            :value="userInfo.user.user.family"
            required
            placeholder="نام خانوادگی"
            :disabled="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="سن :‌">
          <b-skeleton type="input" v-if="!dataReady"></b-skeleton>
          <b-form-input
            v-if="dataReady"
            v-model="form.age"
            required
            placeholder="سن"
            type="number"
            :min="0"
            :max="100"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="معرفی کوتاه :‌">
          <b-skeleton type="input" class="p-5" v-if="!dataReady"></b-skeleton>
          <b-textarea
            v-if="dataReady"
            v-model="form.bio"
            required
            placeholder="معرفی کوتاه"
          >
          </b-textarea>
        </b-form-group>

        <b-form-group label="عکس پروفایل :‌">
          <!-- Styled -->
          <b-form-file v-model="form.avatar" class="mt-3" plain></b-form-file>
          <div class="mt-3">
            فایل انتخاب شده: {{ form.avatar ? form.avatar.name : "" }}
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary" block>بروزرسانی</b-button>
      </b-form>
    </b-col>
    <!-- {{ userInfo.user.user.id ? 121212  : ''}} -->
  </div>
</template>
<script>
// import { mapGetters} from 'vuex';
import axios from "../../axios";
import Noty from "../../plugins/notification";
export default {
  data() {
    return {
      form: {
        age: "",
        bio: "",
        avatar: null,
      },
      show: true,
      dataReady: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const formData = new FormData();
      formData.append("avatar", this.form.avatar);
      formData.append("age", this.form.age);
      formData.append("bio", this.form.bio);
      axios
        .post("/doctor/profile", formData)
        .then(() => {
          Noty({
            message: "پروفایل با موفقیت بروزرسانی شد",
            type: "success",
          });
        })
        .catch(() => {
          Noty({
            message: "اوه مشکلی پیش‌امده",
            type: "error",
          });
        });
    },
  },
  mounted() {
    let test = this.$store.dispatch("setUserLogin");
    test.then(() => {
      this.dataReady = true;
      if (this.userInfo.user.profile.age != null) {
        this.form.age = this.userInfo.user.profile.age;
      }
      if (this.userInfo.user.profile.bio != null) {
        this.form.bio = this.userInfo.user.profile.bio;
      }
    });
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  // mounted(){
  //   this.sho();
  // },
  // computed: {
  //   ...mapGetters(['userInfo'])

  // },
  // watch: {
  // userInfo(result) {
  //   // save Promise result in local state
  //   this.compiledResult = result;
  //   this.dataReady = true
  // }
  // }
};
</script>
