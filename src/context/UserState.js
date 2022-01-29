import { createContext } from "react";

const UserContext = createContext({
  uList: {},
  setUList: () => {},
});
export default UserContext;
