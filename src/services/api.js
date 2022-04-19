import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";
import { useHistory } from "react-router";

import UserWebsocket from "services/user.websocket";
import { POSTURLTest, defUser, POSTURLAdmin } from "const";
import eventBus from "views/eventBus";
const API_URL_TEST = POSTURLTest;

const client = axios.create({
  baseURL: API_URL_TEST,
});
const clientAdmin = axios.create({
  baseURL: POSTURLAdmin,
});

const getAllEvents = async () => {
  var loc = window.location.href;

  //eventBus.dispatch("eventsDataUser", usr);
  if (loc.indexOf("/user") == -1) {
    const { data } = await client.get("/getEvents");
    return data;
  } else {
    return null;
  }
};
const getAllCoins = async () => {
  if (JSON.stringify(authHeader()) != "{}") {
    const { data } = await client.get(`/getCoinPaymentCoins`, {
      headers: authHeader(),
    });
    return data;
  }
};
const getAllGetways = async () => {
  if (JSON.stringify(authHeader()) != "{}") {
    const { data } = await clientAdmin.get(`/getGateways`, {
      headers: authHeader(),
    });
    return data;
  }
};
const getAdminUsers = async () => {
  const { data } = await clientAdmin.get(
    `/getUsersByAdmin?name=username&value=`,
    { headers: authHeader() }
  );
  return data;
};
const getAdminCosts = async () => {
  const { data } = await clientAdmin.get(`/getCost`, { headers: authHeader() });
  return data;
};
const getAllEventsByStatus = async (status) => {
  const getstatus = status.queryKey[1];
  const { data } = await client.get(
    `/getEventsByStatus/?status=${getstatus}&page=1&number=6&order=desc`
  );
  //console.log(data)
  return data;
};
const getEventByID = async (ids) => {
  const id = ids.queryKey[1];

  const { data } = await client.post(`/getEventById`, { id });
  //console.log(data)

  return data;
};
const getInfo = async () => {
  const { data } = await client.get(`/getLooleInfo`);
  //console.log(data)

  return data;
};
const getUser = async () => {
  // alert(JSON.stringify(authHeader()))
  if (JSON.stringify(authHeader()) != "{}" && authHeader()) {
    try {
      const { data } = await client.get("/getUser", { headers: authHeader() });

      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));

        var loc = window.location.href;

        //eventBus.dispatch("eventsDataUser", usr);
        if (loc.indexOf("/user") == -1) {
          //UserWebsocket.connect(data.accessToken+"&user="+data.username);
        }
        return data;
      } else {
        localStorage.setItem("user", JSON.stringify(defUser));
        UserWebsocket.connect();
        return defUser;
      }
    } catch (e) {
      localStorage.setItem("user", JSON.stringify(defUser));

      UserWebsocket.connect();
      return defUser;
    }
  } else {
    localStorage.setItem("user", JSON.stringify(defUser));
    UserWebsocket.connect();

    return defUser;
  }
};
const getUserProfile = async (username) => {
  const user = username.queryKey[1];
  const { data } = await client.get(`/getUserPublic/?username=${user}`);
  return data;
};
const getUserEvents = async (ids) => {
  const id = ids.queryKey[1];
  const { data } = await client.get(`/getEventsByUserId/?id=${id}`);
  return data;
};
const getUserAnalyses = async (ids) => {
  const id = ids.queryKey[1];
  const { data } = await client.get(`/getAnalysisByUser/?id=${id}`, {
    headers: authHeader(),
  });
  return data;
};
const getUserReports = async (ids) => {
  const id = ids.queryKey[1];
  if (id > 0) {
    const { data } = await client.get(
      `/getReportsByUser/?id=${id}&page=1&number=100`,
      {
        headers: authHeader(),
      }
    );
    return data;
  } else {
    return null;
  }
};
const getEvent = async (_, id) => {
  const { data } = await client.get(`/getEventById/${id}`);
  return data;
};
export {
  getAllEvents,
  getAllEventsByStatus,
  getUserEvents,
  getUserProfile,
  getEvent,
  getUser,
  getEventByID,
  getAllCoins,
  getAdminUsers,
  getInfo,
  getUserAnalyses,
  getUserReports,
  getAdminCosts,
  getAllGetways,
};
