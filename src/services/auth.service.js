import axios from "axios";
import { POSTURL,defUser } from 'const';
import UserWebsocket from 'services/user.websocket'
import authHeader from "./auth-header";
const API_URL = POSTURL;

import eventBus from "views/eventBus";
class AuthService {
  serverCheck() {
    return axios.post(API_URL + "serverCheck", { headers: authHeader() }).then((response) => {
        var response = response.data
      if(response=='Expire token' || response=='Not registered'){
        try{
        //localStorage.removeItem("user");
        }catch(e){}
   // window.location.replace("/auth/login-page");
      }
    return response.data;


  }).catch(error => {
    if(error != 'Error: Network Error'){
      alert("ServerDown")
      return false
    }
    
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
          UserWebsocket.disconnect()
          UserWebsocket.connect(response.data.accessToken+"&user="+response.data.username,response.data);
          //eventBus.dispatch("eventsDataUser", response.data);
          //UserWebsocket.connect(response.data.accessToken+"&user="+response.data.username);
        }

        return response.data;
      });
  }

  logout() {
    var loc = window.location.href;
    if (loc.indexOf("/panel") > -1 && loc.indexOf("/panel/lo") == -1){
      UserWebsocket.disconnect();
      UserWebsocket.connect()
      localStorage.setItem("user", JSON.stringify(defUser));
     
      //window.location.replace("/");
    }
    
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
    if(localStorage.getItem('user')){
    const usr = JSON.parse(localStorage.getItem('user'));
    var loc = window.location.href;
    if(usr.accessToken!=''){
    //eventBus.dispatch("eventsDataUser", usr);
    if (loc.indexOf("/panel") > -1){
    UserWebsocket.connect(usr.accessToken+"&user="+usr.username);
    }
  }
    return usr;
    }else{
      //localStorage.setItem("user", JSON.stringify(defUser));
         
    return defUser;
      //this.logout()
    }
  
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
