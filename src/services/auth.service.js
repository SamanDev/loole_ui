import axios from "axios";
import { POSTURL } from 'const';
import UserWebsocket from 'services/user.websocket'
import authHeader from "./auth-header";
const API_URL = POSTURL;

class AuthService {
  serverCheck() {
    return axios.post(API_URL + "serverCheck", { headers: authHeader() }).then((response) => {
        var response = response.data
      if(response=='Expire token' || response=='Not registered'){
        try{
        localStorage.removeItem("user");
        }catch(e){}
    //window.location.replace("/auth/login-page");
      }
    return response.data;


  }).catch(error => {
    alert("ServerDown")
    return false
  });
  }
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          UserWebsocket.connect(response.data.accessToken+"&user="+response.data.username);
        }

        return response.data;
      });
  }

  logout() {
    UserWebsocket.disconnect();
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getCurrentUserTest() {
    if(localStorage.getItem('userTest')){
      return JSON.parse(localStorage.getItem('userTest'));
    }else{
      return JSON.parse(localStorage.getItem('user'));
    }
    
  }
}

export default new AuthService();
