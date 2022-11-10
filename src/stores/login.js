import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useLoadingStore } from "@/stores/loading.js";
import LoginAPI from "@/services/modules/LoginAPI.js";

export const useLoggedInStore = defineStore("loggedIn", () => {
  const { setIsLoading } = useLoadingStore();

  const login = ref(null);
  const password = ref(null);
  const SESSION_ID = ref(localStorage.getItem("SESSION_ID"));

  const loggedIn = computed(() => {
    return !!SESSION_ID.value;
  });

  // eslint-disable-next-line vue/return-in-computed-property
  // const loggedIn = computed(() => {
  //     const userLoginFromLocalStorage = localStorage.getItem('selmefy_user_login');
  //     const userPasswordFromLocalStorage = localStorage.getItem('selmefy_user_password');
  //     if(userLoginFromLocalStorage !== null && userPasswordFromLocalStorage !== null) {
  //         return true;
  //     } else return false
  // });

  const signIn = () => {
    // 1. Set loading GIF process true
    // 2. Send data to Backend
    // 3. If login and password exist, then Backend return SESSION_ID
    //    - Else return error or some response
    // 4. Save SESSION_ID to LocalStorage
    // 5. Update loggedIn to TRUE
    setIsLoading();
    setInterval(() => {
      SESSION_ID.value = LoginAPI.sendLoginData(login.value, password.value);
      if (SESSION_ID.value) {
        localStorage.setItem("SESSION_ID", SESSION_ID.value);
        location.reload();
      }
    }, 2000);
  };

  const logOut = () => {
    // Send data to Backend for stop this session
    // Remove this session id from localStorage
    localStorage.removeItem("SESSION_ID");
    location.reload();
  };

  return {
    loggedIn,
    login,
    password,
    signIn,
    logOut,
  };
});
