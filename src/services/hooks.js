import * as api from "services/api"
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, } from 'react-query'
const queryClient = new QueryClient()
const useAllEvents = () => {
    const result = useQuery(["Events"],api.getAllEvents)
    queryClient.setQueriesData(['Events'], result)
    return result
  }
  const useUser = () => {
  
    const result = useQuery("User",api.getUser)
    queryClient.setQueriesData('User', result)
    return result
  }

const useEvent = (id) => {
  return useQuery(["Event", id], api.getEvent)
}



export {
  useAllEvents,
  useUser,
  useEvent,

}