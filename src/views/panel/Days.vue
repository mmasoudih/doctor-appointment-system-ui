<template>
  <div>
    <b-col class="mx-auto">
      <b-row>
        <b-col cols="12">
          <b-card class="mx-auto mt-3">
            <b-card-header>
              <b-card-text>روز های فعالیت خود را انتخاب کنید</b-card-text>
            </b-card-header>
            <template v-if="!dataReady">
              <b-skeleton
                v-for="n in 6"
                :key="n"
                class="p-5  mt-3 mb-3"
              ></b-skeleton>
            </template>
            <template v-if="dataReady">
              <b-card-body v-for="(day, index) in days" :key="day.id">
                <b-row>
                  <b-col>
                    <b-form-checkbox
                      v-model="selected"
                      name="check-button"
                      button
                      :value="day.id"
                      class="checkbox btn-block mt-4 pt-1"
                      :button-variant="
                        selected.find((e) => e == days[index].id)
                          ? 'success'
                          : 'warning'
                      "
                    >
                      {{ day.week_day }}
                      <template
                        v-if="selected.find((e) => e == days[index].id)"
                      >
                        <b-icon-check-square-fill></b-icon-check-square-fill>
                      </template>
                      <template v-else>
                        <b-icon-check-square></b-icon-check-square>
                      </template>
                    </b-form-checkbox>
                  </b-col>
                  <b-col>
                    <h6 class="text-center font-weight-light">ساعت شروع</h6>
                    <b-form-timepicker
                      v-bind="labels['fa-IR']"
                      :locale="locale"
                      label-close-button="بستن"
                      v-model="days[index].startTime"
                    >
                    </b-form-timepicker>
                  </b-col>
                  <b-col>
                    <h6 class="text-center font-weight-light">ساعت پایان</h6>
                    <b-form-timepicker
                      v-bind="labels['fa-IR']"
                      :locale="locale"
                      label-close-button="بستن"
                      v-model="days[index].endTime"
                    >
                    </b-form-timepicker>
                  </b-col>
                </b-row>
                <br />
              </b-card-body>
            </template>
            <b-button
              @click="saveDay"
              squared
              class="btn-block mt-5"
              variant="outline-success"
              >ثبت تغییرات</b-button
            >
          </b-card>
        </b-col>

        <!-- <pre>

{{days}}
</pre> -->
      </b-row>
    </b-col>
  </div>
</template>
<script>
// import Noty from "../../plugins/notification";
import axios from "../../axios";
export default {
  data() {
    return {
      days: [],
      currentDays: [],
      selected: [],
      dataReady: false,
      locale: "fa-IR",
      labels: {
        "fa-IR": {
          labelNoTimeSelected: "ساعتی انتخاب نشده",
        },
      },
    };
  },
  created() {
    axios.get("/doctor/days").then(async (res) => {
      this.days = await res.data;
      this.dataReady = true;
    });
    axios.get("/doctor/day").then(async (res) => {
      this.currentDays = await res.data;
      this.dataReady = true;
      await this.setDays();
    });
  },

  methods: {
    saveDay() {
      let availableDays = [];
      this.days.filter((e) => {
        if (e.checked && e.startTime && e.endTime) {
          availableDays.push({
            id: e.id,
            start_time: e.startTime,
            end_time: e.endTime,
          });
        }
      });
      axios.post("/doctor/day", availableDays);
      console.log(availableDays);
    },
    setDays() {
      this.currentDays.map((val, index) => {
        this.selected.push(val.id);
        this.days[index].id == val.id
          ? (this.days[index].startTime = val.start_time)
          : "";
        this.days[index].id == val.id
          ? (this.days[index].endTime = val.end_time)
          : "";
      });
    },
  },
};
</script>
<style>
label.btn.btn-warning,
label.btn.btn-success {
  width: 100%;
}
</style>
