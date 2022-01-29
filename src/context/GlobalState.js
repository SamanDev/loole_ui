import { createContext } from "react";

const GlobalContext = createContext({
  myList: {},
  setMyList: () => {},
});
export default GlobalContext;
