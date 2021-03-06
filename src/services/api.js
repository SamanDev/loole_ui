import axios from "axios";
import authHeader from "./auth-header";

import { POSTURLTest, defUser, POSTURLAdmin } from "const.js";
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
  if (id) {
    const { data } = await client.post(`/getEventById`, { id });
    //console.log(data)

    return data;
  }
};
const getInfo = async () => {
  const { data } = await client.get(`/getLooleInfo`);
  //console.log(data)

  return data;
};
const getUser = async () => {
  const id = JSON.stringify(authHeader());

  if (id != "{}" && typeof id !== "undefined") {
    const { data } = await client.get("/getUser", { headers: authHeader() });

    if (data?.accessToken) {
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    }
  } else {
    return null;
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
const getPaparaDeposit = async () => {
  const { data } = await clientAdmin.get(
    `/getPaparaPendingDeposit
  `,
    {
      headers: authHeader(),
    }
  );
  return data;
};
const getCashierDeposit = async () => {
  const { data } = await clientAdmin.get(
    `/getAllDepositCashout?page=0&mode=deposit`,
    {
      headers: authHeader(),
    }
  );
  return data;
};
const getCashierCashout = async () => {
  const { data } = await clientAdmin.get(
    `/getAllDepositCashout?page=0&mode=cashout`,
    {
      headers: authHeader(),
    }
  );
  return data;
};
const getCashierAdminDeposit = async () => {
  const { data } = await clientAdmin.get(
    `/getAllAdminDepositCashout?page=0&mode=deposit`,
    {
      headers: authHeader(),
    }
  );
  return data;
};
const getCashierAdminCashout = async () => {
  const { data } = await clientAdmin.get(
    `/getAllAdminDepositCashout?page=0&mode=cashout`,
    {
      headers: authHeader(),
    }
  );
  return data;
};
const getPaparaCashout = async () => {
  const { data } = await clientAdmin.get(
    `/getPaparaPendingCashout
  `,
    {
      headers: authHeader(),
    }
  );
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
  getPaparaDeposit,
  getPaparaCashout,
  getCashierDeposit,
  getCashierCashout,
  getCashierAdminDeposit,
  getCashierAdminCashout,
};
