import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

import UserWebsocket from "services/user.websocket";
import { POSTURLAdmin, defUser, POSTURLTest } from "const";

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
  joinEvent(id, user) {
    return axios
      .put(
        POSTURLTest + "joinEvent",
        { id },
        { headers: { Authorization: "LooLe  " + user.accessToken } }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
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
  changeReportStatus = (action, id, value) => {
    var u = "editPaparaPendingDeposit";
    if (action === "cashout") {
      u = "editPaparaPendingCashout";
    }

    return axios
      .post(API_URL_TEST + u, { id, value }, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  };
  deleteEvent(id) {
    return (
      axios

        //s.delete(API_URL_TEST + "deleteAllEvent", { headers: authHeader() })
        .delete(API_URL_TEST + "deleteEvent?id=" + id, {
          headers: authHeader(),
        })
        .then((response) => {
          return response;
        })
    );
  }
  deleteUser = (id) => {
    return axios
      .delete(
        API_URL_TEST + "deleteUser?id=" + id,

        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  };
  notification = (username, message, title) => {
    return axios
      .post(
        API_URL_TEST + "notification",
        { username, message, title },

        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  };
  addGateway = (name, mode) => {
    return axios
      .post(
        API_URL_TEST + "addGateway",
        { name, mode },
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
