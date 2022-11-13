<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/_organisms/Navbar/Navbar.vue";
import { useLoggedInStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import LoginForm from "@/components/_organisms/LoginForm/LoginForm.vue";

const { loggedIn } = storeToRefs(useLoggedInStore());
</script>

<template>
  <div>TEST</div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
