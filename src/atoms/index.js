import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
const userState = atom({
    key: 'userState',
    default: '',
  });
  export {userState}