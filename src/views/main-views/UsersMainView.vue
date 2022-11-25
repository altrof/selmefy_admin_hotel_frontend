<script setup>
import { usePersonstore } from "@/stores/person";
import { storeToRefs } from "pinia";
import FormButton from "@/components/_atoms/FormButton/FormButton.vue";
import BasicTable from "@/components/_atoms/BasicTable/BasicTable.vue";
import BaseInput from "@/components/_atoms/BaseInput/BaseInput.vue";
import BaseSelector from "@/components/_atoms/BaseSelector/BaseSelector.vue";
import { onMounted } from "vue";

const { performRequest } = usePersonstore();

let { responseData } = storeToRefs(usePersonstore());

let pageNumber = 0;
let pageSize = 10;
let orderBy = "lastName";
let filterBy = null;
let filterValue = null;

const validOrderBy = ["lastName", "firstName"];

onMounted(() => {
  performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue);
});

function nextPage() {
  pageNumber += 1;
  performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue);
  if (responseData.value.data.length == 0) {
    pageNumber = 0;
    performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue);
  }
}

function runQuery() {
  performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue);
}

function pageSizeChangeHandler(event) {
  pageSize = event.target.value;
  console.log("Shoo" + event.target.value);
}
</script>

<template>
  <!-- This part is only for waiting the request to arrive. -->
  <div v-if="responseData === null"></div>
  <div v-else>
    <FormButton textContent="Search" @click-handler="runQuery()" />
    <FormButton textContent="Next Page" @click-handler="nextPage()" />
    <BaseInput
      class="m-3"
      label="Page size"
      v-model="pageSize"
      type="number"
      v-on:change="pageSizeChangeHandler"
    />
    <BaseSelector
      class="m-3"
      label-text="Order by"
      :options="Object.keys(responseData.data[0])"
      :selected-option="orderBy"
    />

    <BaseSelector
      class="m-3"
      label-text="Filter by"
      :options="Object.keys(responseData.data[0])"
      :selected-option="orderBy"
    />

    <BaseInput
      class="m-3"
      label="Filter value"
      v-model="filterValue"
      type="text"
      v-on:change="pageSizeChangeHandler"
    />
    <BasicTable :tableData="responseData.data" />
  </div>
</template>

<style scoped></style>
