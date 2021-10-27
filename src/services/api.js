import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

import { POSTURLTest } from "const";

const API_URL_TEST = POSTURLTest;


const client = axios.create({
  baseURL: API_URL_TEST ,
})

const getAllEvents=async () => {
  
    const { data } = await client.get("/getEvents")
    return data.data
  }
  const getUser=async () => {
  
    const { data } = await client.get("/getUser",{ headers: authHeader() })
    return data
  }
const getEvent = async (_, id) => {
    const { data } = await client.get(`/getEventById/${id}`)
    return data
  }
export {
  getAllEvents,
  getEvent,
  getUser
}
