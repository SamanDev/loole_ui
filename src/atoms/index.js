import AuthService from "../services/auth.service";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
const userState = atom({
    key: 'userState',
    default: AuthService.getCurrentUser(),
  });
  export {userState}