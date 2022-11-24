import api from "../api";

export default {
  getAllPersons(pageNumber=null, pageSize=null, orderBy=null, filterBy=null, filterValue=null) {
    let requestPath = `/api/person`
    if (pageNumber !== null) {
      requestPath += `?pageNumber=${pageNumber}`
    }

    if (pageSize !== null) {
      requestPath += `&pageSize=${pageSize}`
    }

    if (orderBy !== null) {
      requestPath += `&orderBy=${orderBy}`
    }

    if (filterBy !== null) {
      requestPath += `&filterBy=${filterBy}`
    }

    if (filterValue !== null) {
      requestPath += `&filterValue=${filterValue}`
    }
    return api().get(requestPath);
  },
};
