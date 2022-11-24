<script setup>

import { usePersonstore } from "@/stores/person";
import { storeToRefs } from "pinia";
import FormButton from "@/components/_atoms/FormButton/FormButton.vue";
import BasicTable from "@/components/_atoms/BasicTable/BasicTable.vue";
import { onMounted } from "@vue/runtime-core";


const { performRequest } = usePersonstore();

let { responseData } = storeToRefs(usePersonstore());

let pageNumber = 0
let pageSize = 10
let orderBy = "lastName"
let filterBy = null
let filterValue = null
        
defineProps({
  myPageNumber: Number,
});

onMounted(() => {
    performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue);
})

function nextPage() {
    pageNumber += 1
    performRequest(pageNumber)
}

</script>

<template>
    <FormButton textContent = "click" @click-handler="nextPage()" />
    <!-- This part is only for waiting the request to arrive. -->
    <div v-if="responseData === null"> 
    </div>
    <div v-else>
        <BasicTable :tableData="responseData.data" />
    </div>
</template>

<style scoped>

</style>