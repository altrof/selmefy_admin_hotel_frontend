<script setup>
import { ref, watch } from "vue";
import IconAscSort from "@/components/icons/IconAscSort.vue";
import IconDescSort from "@/components/icons/IconDescSort.vue";

const props = defineProps({
  tableData: Array,
  tableHeaders: Array,
  showIndexes: Boolean,
  currentPage: Number,
  itemsPerPage: Number,
  testAB: String,
  tableKey: Number,
});

const date = ref("");

const emits = defineEmits(["search", "update:inputSearch", "orderBy"]);

const copyTableData = ref([]);

const arrSortByAsc = ref([]);

copyTableData.value.push(...props.tableData);

copyTableData.value.forEach((obj) => {
  Object.entries(obj)
    .filter(([, value]) => value === null)
    .forEach(([key]) => (obj[key] = ""));
  arrSortByAsc.value.push(true);
});

// Frontend orderBy
// const sortByHeader = (key) => {
//   const property = props.tableHeaders[key];
//   sortDirection.value === 1
//     ? (sortDirection.value *= -1)
//     : (sortDirection.value = 1);
//
//   arrSortByAsc.value[key]
//     ? (arrSortByAsc.value[key] = false)
//     : (arrSortByAsc.value[key] = true);
//   return sortDirection.value === 1
//     ? copyTableData.value.sort((obj1, obj2) =>
//         obj2[property] > obj1[property]
//           ? -1
//           : obj1[property] > obj2[property]
//           ? 1
//           : 0
//       )
//     : copyTableData.value.sort((obj1, obj2) =>
//         obj1[property] > obj2[property]
//           ? -1
//           : obj2[property] > obj1[property]
//           ? 1
//           : 0
//       );
// };

const getPropertyName = (keyFromInput) => {
  return props.tableData.length !== 0
    ? Object.keys(props.tableData[0])[keyFromInput]
    : null;
};

const inputSearch = ref("");
const sortBy = ref("");
const updateInput = (key, event) => {
  sortBy.value = getPropertyName(key);
  inputSearch.value = event.target.value;
  emits("update:inputSearch", event.target.value);
};

const updateDate = (key) => {
  if (date.value !== "Invalid Date") {
    inputSearch.value = new Date(Date.parse(date.value)).toLocaleDateString();
    sortBy.value = getPropertyName(key);
  }

  emits("update:inputSearch", date.value);
};

watch(inputSearch, () => emits("search", [sortBy.value, inputSearch.value]));

const format = (date) => {
  const day = date.getDay() < 10 ? "0".concat(date.getDay()) : date.getDay();
  const month =
    date.getMonth() + 1 < 10
      ? "0".concat(date.getMonth() + 1)
      : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
</script>

<template>
  <div class="m-20 mr-40">
    <table class="table w-full items-center border-collapse border shadow-2xl">
      <thead class="bg-blue-300/50">
        <tr>
          <td v-if="showIndexes" class="px-4"></td>
          <td class="pt-4" v-for="(header, key) in tableHeaders" :key="key">
            <p
              @click.prevent="$emit('orderBy', getPropertyName(key))"
              class="flex cursor-pointer pl-8"
            >
              <span class="pt-0.5 pr-0.5">
                <IconAscSort
                  class="h-5 w-5"
                  :id="key"
                  v-if="arrSortByAsc[key]"
                />
                <IconDescSort v-else class="h-5 w-5" :id="key" />
              </span>
              {{ header }}
            </p>
          </td>
        </tr>
        <tr>
          <td v-if="showIndexes" class="font-bold px-4">#</td>
          <td class="px-4 p-3" v-for="(header, key) in tableHeaders" :key="key">
            <input
              v-if="tableHeaders && !header.includes('Date')"
              type="text"
              class="block w-40 rounded h-7 border-solid border border-black/10 hover:border-black/30"
              :id="key"
              @input="updateInput(key, $event)"
            />

            <Datepicker
              v-if="header.includes('Date')"
              v-model="date"
              :format="format"
              :id="key"
              class="w-40"
              :enable-time-picker="false"
              @update:model-value="updateDate(key)"
            />
          </td>
        </tr>
      </thead>
      <template v-if="tableData.length > 0">
        <tbody
          class="bg-gray-300/50 border-t-2 border-black/30 justify-center place-items-center"
          v-for="(object, id) in tableData"
          :key="object"
        >
          <tr class="hover:bg-gray-300">
            <td v-if="showIndexes" class="px-4">
              {{ (currentPage - 1) * itemsPerPage + id + 1 }}
            </td>
            <td
              class="px-6 py-1 pl-10 mr-2"
              v-for="element in object"
              :key="element"
            >
              {{ element }}
            </td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <p>No data</p>
      </template>
    </table>
  </div>
</template>

<style lang="scss">
.dp__input {
  height: 1.9rem;
  border-color: black;
}
</style>
