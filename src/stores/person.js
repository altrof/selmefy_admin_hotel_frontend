import { defineStore } from "pinia";
import { ref } from "vue";
import PersonsAPI from "../services/modules/PersonAPI";

export const usePersonstore = defineStore("person", () => {

    const responseData = ref(null);
    const peopleInBooking = ref({})

  function performRequest(pageNumber, pageSize, orderBy, filterBy, filterValue) {
    PersonsAPI.getAllPersons(pageNumber, 2, 'firstName').then((response) => {
        responseData.value = response;
      });
  }

    return {responseData, peopleInBooking, performRequest}
})
