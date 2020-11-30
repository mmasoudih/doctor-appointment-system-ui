<template>
  <div>
    <!-- <b-form-tags
      tag-pills
      tag-variant="success"
      placeholder="افزودن تخصص"
      add-button-text="افزودن"
      duplicate-tag-text="تخصص تکراری "
      remove-on-delete
      class="mt-5"
      v-model="speciality"
      
    ></b-form-tags>
    {{ speciality }} -->

    <b-form-group label="لطفا تخصص خود را از لیست زیر انتخاب کنید">
      <b-form-tags v-model="value" no-outer-focus class="mb-2">
        <template v-slot="{ tags, disabled, addTag, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
                >{{ tag }}</b-form-tag
              >
            </li>
          </ul>

          <b-dropdown
            size="sm"
            variant="outline-secondary"
            block
            menu-class="w-100"
          >
            <template #button-content>
              <b-icon icon="tag-fill"></b-icon> انتخاب تخصص
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="جستجو تخصص"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="search"
                  id="tag-search-input"
                  type="search"
                  size="sm"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="option in availableOptions"
              :key="option"
              @click="onOptionClick({ option, addTag })"
            >
              {{ option }}
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptions.length === 0">
              تخصص مورد نظر شما پیدا نشد
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        "جراح مغز",
        "جراح قلب",
        "متخصص اعصاب",
        "متخصص ریه",
        "متخصص چشم",
        "متخصص گوش",
        "متخصص معده و گوارش",
      ],
      search: "",
      value: [],
    };
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.options.filter(
        (opt) => this.value.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "تخصص مورد نظر شما پیدا نشد";
      }
      return "";
    },
  },
  methods: {
    onOptionClick({ option, addTag }) {
      addTag(option);
      this.search = "";
    },
  },
};
</script>
