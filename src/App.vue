<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/_organisms/Navbar/Navbar.vue";
import { useLoggedInStore } from "@/stores/login.js";
import { storeToRefs } from "pinia";
import LoginForm from "@/components/_organisms/LoginForm/LoginForm.vue";

const { loggedIn } = storeToRefs(useLoggedInStore());
</script>

<template>
  <div v-if="loggedIn">
    <Navbar>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/bookings">Bookings</RouterLink>
      <RouterLink to="/rooms">Rooms</RouterLink>
      <RouterLink to="/users">Users</RouterLink>
      <RouterLink to="/special-offers">Special Offers</RouterLink>
    </Navbar>
    <RouterView />
  </div>
  <div v-else>
    <LoginForm />
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
