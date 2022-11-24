<script setup>

import { usePersonstore } from "@/stores/person";
import { storeToRefs } from "pinia";
import FormButton from "@/components/_atoms/FormButton/FormButton.vue";
import BasicTable from "@/components/_atoms/BasicTable/BasicTable.vue";
import BaseInput from "@/components/_atoms/BaseInput/BaseInput.vue";
import { onMounted } from "@vue/runtime-core";


const { performRequest } = usePersonstore();

let { responseData } = storeToRefs(usePersonstore());

let pageNumber = 0
let pageSize = 10
let orderBy = "lastName"
let filterBy = null
let filterValue = null


onMounted(() => {
    performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue);
})

function nextPage() {
    pageNumber += 1
    performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue)
    if (responseData.value.data.length == 0) {
        pageNumber = 0
        performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue)
    }
}

function pageSizeHandler(event) {
    performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue)
    console.log("Boo" + pageSize)

}

function inputChangeHandler(event) {
    pageSize = event.target.value
    console.log("Shoo" + event.target.value)
}

</script>

<template>
    <FormButton textContent="Next" @click-handler="nextPage()" />
    <FormButton textContent="Page size" @click-handler="pageSizeHandler()"/>
    <BaseInput label="Page size" 
                v-model="pageSize" type="number" 
                v-on:change="inputChangeHandler" />
    <!-- This part is only for waiting the request to arrive. -->
    <div v-if="responseData === null"> 
    </div>
    <div v-else>
        <BasicTable :tableData="responseData.data" />
    </div>
</template>

<style scoped>

</style>