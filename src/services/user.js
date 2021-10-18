import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  import {
    userState
  } from 'atoms';

  function getCurrentUser(props) {
    return useRecoilValue(userState);
  
  
  }
  export default (getCurrentUser)