import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";
import { POSTURLTest } from "const";
import { useState } from "react"
import eventBus from "views/eventBus";
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
          return response.data;
        }
      });
  }
  sendChat( message,id) {
   
    return axios
      .put(
        API_URL_TEST + "sendChat",
        { message, id},
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          
        }
      });
  }
  sendChatUpload(uploadInfo) {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [progress, setProgress] = useState()
    return axios
      .post(
        API_URL_TEST + "uploadFile",
        uploadInfo,
        { headers:uploadHeader(),
          onUploadProgress: data => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total))
        }}
      )
      .then((response) => {
       console.log(response);
      });
  }
  createEvent(gameName, gameConsole, gameMode, amount, timeMinute) {
    console.log(
      { gameName, gameConsole, gameMode, amount, timeMinute },
      { headers: authHeader() }
    );
    return axios
      .post(
        API_URL_TEST + "createEvent",
        { gameName, gameConsole, gameMode, amount, timeMinute },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  joinEvent(id) {
    return axios
      .put(API_URL_TEST + "joinEvent", { id }, { headers: authHeader() })
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  loseEvent(id) {
    return axios
      .put(API_URL_TEST + "loseEvent", { id }, { headers: authHeader() })
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  leaveEvent(id) {
    return axios
      .put(API_URL_TEST + "leaveEvent", { id }, { headers: authHeader() })
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  deleteEvent(id) {
    return axios
      .delete(API_URL_TEST + "deleteEvent?id="+id, { headers: authHeader() })
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  changeReadyEvent(id) {
    return axios
      .put(
        API_URL_TEST + "changeReadyEvent",
        { id },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("ok");
        // localStorage.setItem("events", JSON.stringify(response.data));
        //localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }
  getEvents() {
    return axios.get(API_URL_TEST + "getEvents").then((response) => {
      //console.log(response.data.data)
      eventBus.dispatch("eventsData", response.data.data);
    });
  }
  createTournament(gamename, gameconsole, tournamentmode, bet, time) {
    return axios
      .post(
        API_URL_TEST + "createTournament",
        { gamename, gameconsole, tournamentmode, bet, time },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          return response.data;
        }
      });
  }
}

export default new UserService();
