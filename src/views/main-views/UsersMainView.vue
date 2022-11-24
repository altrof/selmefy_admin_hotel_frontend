<script setup>

import { usePersonstore } from "@/stores/person";
import { storeToRefs } from "pinia";
import BasicTable from "@/components/_atoms/BasicTable/BasicTable.vue";

const { responseData } = storeToRefs(usePersonstore());
console.log(responseData);

</script>

<template>
    <BasicTable :tableData="responseData.data" />
</template>

<style scoped>

</style>