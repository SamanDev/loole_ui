import axios from "axios";
import { POSTURL, defUser } from "const";
import UserWebsocket from "services/user.websocket";
import authHeader from "./auth-header";
const API_URL = POSTURL;
import Swal from "sweetalert2";
import eventBus from "views/eventBus";
class AuthService {
  serverCheck() {
    return axios
      .post(API_URL + "serverCheck", { headers: authHeader() })
      .then((response) => {
        var response = response.data;
        if (response == "Expire token" || response == "Not registered") {
          try {
            //localStorage.removeItem("user");
          } catch (e) {}
          // window.location.replace("/auth/login-page");
        }
        return response.data;
      })
      .catch((error) => {
        if (error != "Error: Network Error") {
          alert("ServerDown");
          return false;
        }
      });
  }

  login(username, password) {
    UserWebsocket.disconnect();
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        return response;
      });
  }
  login2(username, password) {
    return axios
      .put(API_URL + "setUserPass", {
        username,
        password,
      })
      .then((response) => {
        return axios
          .post(API_URL + "signin", {
            username,
            password,
          })
          .then((response) => {
            return response;
          });
      });
  }
  logout() {
    var loc = window.location.href;

    localStorage.setItem("user", JSON.stringify(defUser));

    if (loc.indexOf("/panel") > -1 && loc.indexOf("/lobby") == -1) {
      //window.location.replace("/");
    } else {
      Swal.fire({
        icon: "success",
        title: "Done",
      });
    }
    //UserWebsocket.disconnect();
    //UserWebsocket.connect()
  }

  register(username, email, password, refer) {
    return axios
      .post(API_URL + "signup", {
        username,
        email,
        password,
        refer,
      })
      .then((response) => {
        return response;
      });
  }

  getCurrentUser() {
    if (localStorage.getItem("user")) {
      const usr = JSON.parse(localStorage.getItem("user"));

      return usr;
    } else {
      //localStorage.setItem("user", JSON.stringify(defUser));

      return defUser;
      //this.logout()
    }
  }
  getCurrentUserTest() {
    if (localStorage.getItem("userTest")) {
      return JSON.parse(localStorage.getItem("userTest"));
    } else {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
}

export default new AuthService();
