import { createContext } from "react";

const EventContext = createContext({
  eList: {},
  setEList: () => {},
});
export default EventContext;
