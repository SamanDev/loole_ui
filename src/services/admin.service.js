import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

import UserWebsocket from "services/user.websocket";
import { POSTURLAdmin, defUser } from "const";

const API_URL_TEST = POSTURLAdmin;

class AdminService {
  loseEvent = (id, username) => {
    return axios
      .put(
        API_URL_TEST + "loseEventByAdmin",
        { id, username },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  };
  loseEventMatch = (id, idMatch, username) => {
    return axios
      .put(
        API_URL_TEST + "loseEventByAdmin",
        { id, idMatch, username },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  };
  changeBalance = (id, dollarAmount, name, bankModel) => {
    return axios
      .post(
        API_URL_TEST + "chipService",
        { id, dollarAmount, name, bankModel },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  };

  updateUserByAdmin = (id, key, value) => {
    return axios
      .put(
        API_URL_TEST + "updateUserByAdmin",
        { id, key, value },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  };
  usersDisconnectByAdmin = (user) => {
    return axios
      .get(API_URL_TEST + "usersDisconnectByAdmin?username=" + user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  };
}

export default new AdminService();
