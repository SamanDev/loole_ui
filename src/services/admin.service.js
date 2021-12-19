import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

import UserWebsocket from 'services/user.websocket'
import { POSTURLTest,defUser } from "const";

const API_URL_TEST = POSTURLTest;


class AdminService {
  
    updateUserByAdmin =  (id,key,value) => {

    return   axios
      .put(API_URL_TEST + "updateUserByAdmin",{id,key,value}, { headers: authHeader() })
      .then( (response) => {
        
        return response;
      })
       
  }
  
}

export default new AdminService();
