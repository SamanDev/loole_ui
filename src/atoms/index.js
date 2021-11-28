import userService from "services/user.service";
import AuthService from "services/auth.service";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  //userService.getUser();
const userState = atom({
    key: 'userState',
    default: AuthService.getCurrentUser(),
  });
  export {userState}