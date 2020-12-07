<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      v-if="dataReady"
      striped
      id="my-table"
      hover
      :items="doctors"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>
<script>
import axios from "../../axios";
export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "ردیف",
        },
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
      ],
      doctors: [],
      dataReady: false,
      perPage: 3,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.doctors.length;
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
