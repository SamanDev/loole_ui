export default function uploadHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
     return { Authorization: 'LooLe  ' + user.accessToken ,"Content-Type": "multipart/form-data"}
    
     // for Spring Boot back-end
   // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
