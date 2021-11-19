import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

import { POSTURLTest,defUser } from "const";

const API_URL_TEST = POSTURLTest;


const client = axios.create({
  baseURL: API_URL_TEST ,
})

const getAllEvents=async () => {
  
  const { data } = await client.get("/getEvents")
  return data.data
}
const getAllEventsByStatus=async (status) => {
  const getstatus = status.queryKey[1];
  const { data } = await client.get(`/getEventsByStatus/?status=${getstatus}&page=1&number=6&order=desc`)
  //console.log(data)
  return data
}
  const getUser=async () => {
  
    const { data } = await client.get("/getUser",{ headers: authHeader() })
    if (data.accessToken) {
      
      return data;
    }else{
      
return defUser;
    }
    
  }
  const getUserProfile=async (username) => {
  const user = username.queryKey[1];
    const { data } = await client.get(`/getUserPublic/?username=${user }`)
    return data
  }
  const getUserEvents=async () => {
  
    const { data } = await client.get("/getUserEvents",{ headers: authHeader() })
    return data
  }
const getEvent = async (_, id) => {
    const { data } = await client.get(`/getEventById/${id}`)
    return data
  }
export {
  getAllEvents,
  getAllEventsByStatus,
  getUserEvents,
  getUserProfile,
  getEvent,
  getUser
}
