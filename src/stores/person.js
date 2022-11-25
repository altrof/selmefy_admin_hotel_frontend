import { defineStore } from "pinia";
import { ref } from "vue";
import PersonsAPI from "../services/modules/PersonAPI";

export const usePersonstore = defineStore("person", () => {
  const responseData = ref(null);
  const peopleInBooking = ref({});

  async function performRequest(
    pageNumber,
    pageSize,
    orderBy,
    filterBy,
    filterValue
  ) {
    PersonsAPI.getAllPersons(
      pageNumber,
      pageSize,
      orderBy,
      filterBy,
      filterValue
    ).then((response) => {
      responseData.value = response;
    });
  }

  return { responseData, peopleInBooking, performRequest };
});
