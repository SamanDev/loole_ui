import * as api from "services/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  QueryCache,
} from "react-query";

const useAllEvents = () => {
  const result = useQuery(["Events"], api.getAllEvents);

  return result;
};
const useAllEventsByStatus = (status) => {
  const result = useQuery(["Events", status], api.getAllEventsByStatus);
  //sconsole.log(result)
  return result;
};
const useAllCoins = (status) => {
  const result = useQuery(["Cois"], api.getAllCoins);
  //sconsole.log(result)
  return result;
};
const useAllGetways = () => {
  const result = useQuery(["Getways"], api.getAllGetways);
  //sconsole.log(result)
  return result;
};
const useEventByID = (id) => {
  const result = useQuery(["Event", parseInt(id)], api.getEventByID);
  return result;
};
const useUser = () => {
  const result = useQuery(["User"], api.getUser, {
    refetchOnWindowFocus: true,
  });

  return result;
};
const useInfo = () => {
  const result = useQuery(["Info"], api.getInfo);

  return result;
};
const useAdminUsers = () => {
  const result = useQuery(["AdminUsers"], api.getAdminUsers);

  return result;
};
const usePapara = (action) => {
  if (action == "getDeposit") {
    const result = useQuery(["PaparaDeposit"], api.getPaparaDeposit);

    return result;
  }
  if (action == "getCashout") {
    const result = useQuery(["PaparaCashoout"], api.getPaparaCashout);

    return result;
  }
};
const useAdminCosts = () => {
  const result = useQuery(["AdminCosts"], api.getAdminCosts);

  return result;
};
const useUserProfile = (username) => {
  const result = useQuery(["User", username], api.getUserProfile);

  return result;
};

const useUserEvents = (id) => {
  const result = useQuery(["UserEvent", parseInt(id)], api.getUserEvents);

  return result;
};
const useUserAnalyses = (id) => {
  const result = useQuery(["UserAnalyses", parseInt(id)], api.getUserAnalyses);

  return result;
};
const useUserReports = (id) => {
  const result = useQuery(["UserReports", parseInt(id)], api.getUserReports);

  return result;
};
const useEvent = (id) => {
  return useQuery(["Event", id], api.getEvent);
};

export {
  useAllEvents,
  useAllEventsByStatus,
  useUserEvents,
  useUser,
  useUserProfile,
  useEvent,
  useEventByID,
  useAllCoins,
  useAdminUsers,
  useInfo,
  useUserAnalyses,
  useUserReports,
  useAdminCosts,
  useAllGetways,
  usePapara,
};
