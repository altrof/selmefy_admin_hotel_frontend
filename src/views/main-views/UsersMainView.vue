<script setup>

import { usePersonstore } from "@/stores/person";
import { storeToRefs } from "pinia";
import BasicTable from "@/components/_atoms/BasicTable/BasicTable.vue";
import { onMounted } from "@vue/runtime-core";

const { performRequest } = usePersonstore();
let { pageNumber } = storeToRefs(usePersonstore());

let { responseData } = storeToRefs(usePersonstore());

defineProps({
  myPageNumber: Number,
});

onMounted(() => {
    pageNumber = 0
    performRequest(pageNumber);
})

</script>

<template>
    <!-- This part is only for waiting the request to arrive. -->
    <div v-if="responseData === null"> 
    </div>
    <div v-else>
        <BasicTable :tableData="responseData.data" />
    </div>
</template>

<style scoped>

</style>