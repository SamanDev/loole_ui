import axios from "axios";
import { POSTURL } from 'const';
import UserWebsocket from 'services/user.websocket'

const API_URL = POSTURL;

class AuthService {
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
    return JSON.parse(localStorage.getItem('userTest'));
  }
}

export default new AuthService();
