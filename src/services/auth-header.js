export default function authHeader() {
  try{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.accessToken !='') {
      return { Authorization: 'LooLe  ' + user.accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
   } else {
     return {};
   }
  }catch(e){}
  
  
}
