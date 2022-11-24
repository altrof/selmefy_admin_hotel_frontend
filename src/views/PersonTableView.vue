<script setup>
//import Table from "@/components/_atoms/Table/Table.vue";
import { usePersonstore } from "@/stores/person";
import { storeToRefs } from "pinia";

const { responseData } = storeToRefs(usePersonstore());
console.log(responseData);
</script>

<template>
  <DataMainView />
  <div class="container">
  </div>
</template>

<style scoped>
.container {
  padding-top: 10%;
  padding-left: 25%;
}
</style>
