import * as api from "services/api"
import { useQuery, useMutation, queryCache } from "react-query"

const useAllEvents = () => {
  return useQuery("Events", api.getAllEvents)
}

const useEvent = (id) => {
  return useQuery(["Event", id], api.getEvent)
}



export {
  useAllEvents,

  useEvent,

}