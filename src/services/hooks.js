import * as api from "services/api"
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, } from 'react-query'
const queryClient = new QueryClient()
const useAllEvents = () => {
  const result = useQuery(["Events"],api.getAllEvents)
  //queryClient.setQueriesData(['Events'], result)
  return result
}
const useAllEventsByStatus = (status) => {
  const result = useQuery(["Events", status],api.getAllEventsByStatus);
 
  return result
}
  const useUser = () => {
  
    const result = useQuery(["User"],api.getUser)
   
    return result
  }
  const useUserProfile = (username) => {
  
    const result = useQuery(["User",username],api.getUserProfile)
    
    return result
  }
  const useUserEvents = () => {
  
    const result = useQuery("UserEvent",api.getUserEvents)
    
    return result
  }

const useEvent = (id) => {
  return useQuery(["Event", id], api.getEvent)
}



export {
  useAllEvents,
  useAllEventsByStatus,
  useUserEvents,
  useUser,
  useUserProfile,
  useEvent,

}