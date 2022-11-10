import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref(false);

  const setIsLoading = () => {
    isLoading.value = true;
  };

  return {
    isLoading,
    setIsLoading,
  };
});
