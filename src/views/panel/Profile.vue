<template>
  <div>
    <b-col cols="7" class="mx-auto">
      <b-row>
        <b-col cols="3" sm="3" class="mt-3 mb-2 mx-auto">
          <b-avatar
            :src="
              profileData.user.avatar == null
                ? profileData.user.user.profile_photo_url
                : profileData.user.avatar
            "
            size="6rem"
          ></b-avatar>
        </b-col>
      </b-row>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="نام :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="نام"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="نام خانوادگی :‌"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="نام خانوادگی"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="سن :‌"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="سن"
            type="number"
            :min="0"
            :max="100"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="معرفی کوتاه :‌"
          label-for="input-2"
        >
          <b-textarea
            id="input-2"
            v-model="form.name"
            required
            placeholder="معرفی کوتاه"
            >

          </b-textarea>
        </b-form-group>


        <b-button type="submit" variant="primary" block>بروزرسانی</b-button>
      </b-form>
    </b-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    profileData() {
      return this.$store.getters.userInfo;
    },
  },
};
</script>
