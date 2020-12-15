<template>
  <div class="overflow-auto">
    <h2 class="mb-2 mt-2 pt-3 pb-3">
      لیست دکتران 
    </h2>
    <b-table
      ref="test"
      v-if="dataReady"
      id="my-table"
      :items="doctors"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      striped
      hover
      small
    >
      <template v-slot:cell(status)="row">
        <b-badge v-if="row.item.is_active == 1" variant="success" pill
          >فعال</b-badge
        >
        <b-badge v-if="row.item.is_active == 0" variant="danger" pill>
          غیرفعال</b-badge
        >
      </template>
      <template v-slot:cell(actions)="row">
        <template v-if="row.item.is_active == 1">
          <b-button
            variant="warning"
            size="sm"
            squared
            @click="disableAccount(row.item.id)"
            >غیرفعال کردن</b-button
          >
        </template>
        <template v-if="row.item.is_active == 0">
          <b-button
            variant="success"
            size="sm"
            squared
            @click="enableAccount(row.item.id)"
            >فعال کردن</b-button
          >
        </template>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      v-if="perPage <= rows"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
  </div>
</template>
<script>
import axios from "../../axios";
import Noty from "../../plugins/notification";
export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "نام",
        },
        {
          key: "family",
          label: "نام خانوادگی",
        },
        {
          key: "phone",
          label: "شماره موبایل",
        },
        {
          key: "status",
          label: "وضعیت",
        },
        {
          key: "actions",
          label: "عملیات",
        },
      ],
      doctors: [],
      dataReady: false,
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.doctors.length;
    },
  },
  methods: {
    enableAccount(id) {
      let test = axios.post(`${"changeDoctorStatus/" + id}`);
      test.then(() => {
        this.doctors.map((item) => (item.id == id ? (item.is_active = 1) : ""));
        Noty({
          message: "حساب دکتر با موفقیت فعال شد",
          type: "success",
        });
      });
    },
    disableAccount(id) {
      let test = axios.post(`${"changeDoctorStatus/" + id}`);
      test.then(() => {
        this.doctors.map((item) => (item.id == id ? (item.is_active = 0) : ""));
        Noty({
          message: "حساب دکتر با موفقیت غیر فعال شد",
          type: "info",
        });
      });
    },
  },

  created() {
    axios.get("/getDoctors").then(async (res) => {
      this.doctors = await res.data;
      this.dataReady = true;
    });
  },
};
</script>
