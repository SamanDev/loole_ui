import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

import UserWebsocket from "services/user.websocket";
import { POSTURLTest, defUser } from "const";
import { useState } from "react";
import eventBus from "views/eventBus";
import * as api from "services/api";
import { useAllEvents, useUser, useEvent } from "services/hooks";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
const API_URL_TEST = POSTURLTest;

class UserService {
  getPublicContent() {
    return axios.get(API_URL_TEST + "all");
  }

  getUserBoard() {
    return axios.get(API_URL_TEST + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL_TEST + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL_TEST + "admin", { headers: authHeader() });
  }
  setOldInfo(instagram, image, oldUser, balance) {
    //var json  = '{"logging_page_id":"profilePage_403491613","show_suggested_profiles":false,"show_follow_dialog":false,"graphql":{"user":{"biography":"","blocked_by_viewer":false,"restricted_by_viewer":null,"country_block":false,"external_url":null,"external_url_linkshimmed":null,"edge_followed_by":{"count":378},"fbid":"17841401068396304","followed_by_viewer":false,"edge_follow":{"count":228},"follows_viewer":false,"full_name":"Salar Abbasi","has_ar_effects":false,"has_clips":false,"has_guides":false,"has_channel":false,"has_blocked_viewer":false,"highlight_reel_count":0,"has_requested_viewer":false,"id":"403491613","is_business_account":false,"is_joined_recently":false,"business_category_name":null,"overall_category_name":null,"category_enum":null,"category_name":null,"is_private":true,"is_verified":false,"edge_mutual_followed_by":{"count":0,"edges":[]},"profile_pic_url":"https://z-p42-instagram.fbtz1-3.fna.fbcdn.net/v/t51.2885-19/s150x150/28750969_1830135053957301_8088169488547053568_n.jpg?tp=1&_nc_ad=z-m&_nc_ht=z-p42-instagram.fbtz1-3.fna.fbcdn.net&_nc_ohc=bnGG2fuGocMAX8fMsUQ&ccb=7-4&oh=5640b3d3607ae693f0d06331ecb1aa84&oe=6082DD40&_nc_sid=7bff83","profile_pic_url_hd":"https://z-p42-instagram.fbtz1-3.fna.fbcdn.net/v/t51.2885-19/s320x320/28750969_1830135053957301_8088169488547053568_n.jpg?tp=1&_nc_ad=z-m&_nc_ht=z-p42-instagram.fbtz1-3.fna.fbcdn.net&_nc_ohc=bnGG2fuGocMAX8fMsUQ&ccb=7-4&oh=025f2aa66a232c61444f8aa190cb6d40&oe=60844748&_nc_sid=7bff83","requested_by_viewer":false,"should_show_category":false,"username":"salar198","connected_fb_page":null,"edge_felix_video_timeline":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"edge_owner_to_timeline_media":{"count":318,"page_info":{"has_next_page":true,"end_cursor":"QVFBMkx6czE3ZkxPdE14RnItdVczTThRZkJSRjloQlBheXNnNTJtN000b0wzVmhaTmpCLUhVTEZJUUtzS1U4cHB6U0RVVklQT0dmU0RQNmVyaWVhRHJUcQ=="},"edges":[]},"edge_saved_media":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"edge_media_collections":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"edge_related_profiles":{"edges":[]}}},"toast_content_on_load":null,"show_view_shop":false,"profile_pic_edit_sync_props":null}'
    // console.log(instagram);
    return axios
      .post(
        API_URL_TEST + "oldInfo",
        { instagram, image, oldUser, balance },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          eventBus.dispatch("eventsDataUser", response.data);
          eventBus.remove("eventsDataUser");
          return response.data;
        }
      });
  }
  sendChat(message, id) {
    return axios
      .put(
        API_URL_TEST + "sendChat",
        { message, id },
        { headers: authHeader() }
      )
      .then((response) => {
        // eventBus.dispatch("eventsData", "");
      });
  }
  sendChatMatch(message, id, idMatch) {
    return axios
      .put(
        API_URL_TEST + "sendChatMatch",
        { message, id, idMatch },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
        }
      });
  }
  sendChatUpload(uploadInfo) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState();
    return axios
      .post(API_URL_TEST + "uploadFile", uploadInfo, {
        headers: uploadHeader(),
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        console.log(response);
      });
  }

  saveTags(gameName, gamePlatform, tagId, nickName) {
    return axios
      .post(
        API_URL_TEST + "saveTags",
        { gameName, gamePlatform, tagId, nickName },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  saveSocial(accountName, accountId) {
    return axios
      .post(
        API_URL_TEST + "saveSocial",
        { accountName, accountId },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  finishClashRoyale(id) {
    return axios
      .post(
        API_URL_TEST + "checkClashRoyaleResult",
        { id },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  joinEvent(id) {
    return axios
      .put(API_URL_TEST + "joinEvent", { id }, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }
  loseEvent(id, idMatch) {
    if (idMatch) {
      return axios
        .put(
          API_URL_TEST + "loseEvent",
          { id, idMatch },
          { headers: authHeader() }
        )
        .then((response) => {
          console.log("ok");

          // localStorage.setItem("events", JSON.stringify(response.data));
          //localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        });
    } else {
      return axios
        .put(API_URL_TEST + "loseEvent", { id }, { headers: authHeader() })
        .then((response) => {
          console.log("ok");
          //this.getEventById(id)
          // localStorage.setItem("events", JSON.stringify(response.data));
          //localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        });
    }
  }
  leaveEvent(id) {
    return axios
      .put(API_URL_TEST + "leaveEvent", { id }, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }

  deleteEvent(id) {
    return (
      axios

        .get(API_URL_TEST + "deleteAllEvent", { headers: authHeader() })
        //.delete(API_URL_TEST + "deleteEvent?id=" + id, { headers: authHeader() })
        .then((response) => {
          console.log("ok");
          // localStorage.setItem("events", JSON.stringify(response.data));
          //localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        })
    );
  }
  changeReadyEvent(id) {
    return axios
      .put(API_URL_TEST + "changeReadyEvent", { id }, { headers: authHeader() })
      .then((response) => {
        //eventBus.remove("eventsDataEventDo");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response;
      });
  }
  getEvents() {
    //return useQuery("Events", api.getAllEvents)
  }
  getEventById = (id) => {
    alert();
    return axios
      .post(API_URL_TEST + "getEventById", { id })
      .then((response) => {
        //eventBus.dispatch("eventsDataEventDo", response.data);
        //eventBus.remove("eventsDataEventDo");
        return response.data;
      })
      .catch((error) => {
        return axios.get(API_URL_TEST + "getEvents").then((response) => {
          var _d = JSON.parse(response.data.data).filter(
            (list) => list.id === id
          );

          //eventBus.dispatch("eventsDataEventDo", _d);
        });
      });
  };
  getCurrentEvent(token) {
    //return useQuery("Events", api.getAllEvents)
  }
  editInfo(name, country, birthday) {
    return axios
      .put(
        API_URL_TEST + "editInfo",
        { name, country, birthday },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  changePassword(newPassword) {
    return axios
      .put(
        API_URL_TEST + "changePassword",
        { newPassword },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  createLeague(
    gameName,
    gameConsole,
    gameMode,
    amount,
    startTime,
    finished,
    totalPlayer,
    tournamentPayout,
    inSign,
    outSign,
    currency,
    rules
  ) {
    return axios
      .post(
        API_URL_TEST + "createEvent",
        {
          gameName,
          gameConsole,
          gameMode,
          amount,
          startTime,
          finished,
          totalPlayer,
          tournamentPayout,
          inSign,
          outSign,
          currency,
          rules,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  createTournament(
    gameName,
    gameConsole,
    gameMode,
    amount,
    timeMinute,
    startTime,
    totalPlayer,
    tournamentPayout,
    inSign,
    outSign,
    currency,
    prize,
    rules
  ) {
    return axios
      .post(
        API_URL_TEST + "createEvent",
        {
          gameName,
          gameConsole,
          gameMode,
          amount,
          timeMinute,
          startTime,
          totalPlayer,
          tournamentPayout,
          inSign,
          outSign,
          currency,
          prize,
          rules,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  createEvent(
    gameName,
    gameConsole,
    gameMode,
    amount,
    inSign,
    outSign,
    currency,
    timeMinute,
    startTime
  ) {
    return axios
      .post(
        API_URL_TEST + "createEvent",
        {
          gameName,
          gameConsole,
          gameMode,
          amount,
          inSign,
          outSign,
          currency,
          timeMinute,
          startTime,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  resendActive() {
    return axios
      .post(
        API_URL_TEST + "resendActivationLink",
        {},
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
  deleteEvents() {
    return axios
      .delete(
        API_URL_TEST + "handleDelete",

        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        return "Ok";
      });
  }
  createDepositCyripto(action, amount, coin) {
    return axios
      .post(
        API_URL_TEST + "coinPayments",
        { action, coin, amount },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");

        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  createDepositVisaCode(voucherCode) {
    return axios
      .post(
        API_URL_TEST + "visaGiftCodeVoucher",
        { voucherCode },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  createCashoutShetab(cardNumber, amount) {
    return axios
      .post(
        API_URL_TEST + "createDepositShetabDoTransaction",
        { cardNumber, amount },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
  createDepositShetabDoTransaction(
    mobile,
    cardNumber,
    amount,
    cvv,
    expire,
    pin,
    txID,
    name
  ) {
    return axios
      .post(
        API_URL_TEST + "createDepositShetabDoTransaction",
        { mobile, cardNumber, amount, cvv, expire, pin, txID, name },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  createDepositShetabGetPassCode(
    mobile,
    cardNumber,
    amount,
    cvv,
    expire,
    name
  ) {
    return axios
      .post(
        API_URL_TEST + "createDepositShetabGetPassCode",
        { mobile, cardNumber, amount, cvv, expire, name },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  createDepositShetabVerify(mobile, name) {
    return axios
      .post(
        API_URL_TEST + "createDepositShetabVerify",
        { mobile, name },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        //return response.data;
        return response;
      })
      .catch((error) => {
        return "Ok";
      });
  }
  createDepositShetabVerifyConfirm(mobile, code, name) {
    return axios
      .post(
        API_URL_TEST + "createDepositShetabVerifyConfirm",
        { mobile, code, name },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        //return response.data;
        return response;
      })
      .catch((error) => {
        return "Ok";
      });
  }
  createDepositPM(voucherNumber, voucherCode) {
    return axios
      .post(
        API_URL_TEST + "createDepositPM",
        { voucherNumber, voucherCode },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
}
function isJson(str) {
  // alert("str = "+str)
  try {
    JSON.parse(str);
  } catch (e) {
    // alert('no JSON')
    return false;
  }
  // alert('yes JSON')
  return true;
}
export default new UserService();
