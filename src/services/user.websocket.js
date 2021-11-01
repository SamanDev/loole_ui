import { USERSOCKETURL } from 'const';
//import Dashboard from 'views/Dashboard'
import eventBus from "views/eventBus";
import userService from "services/user.service";
var ws;
var timerId = 0;
class UserWebsocket {
   

    connect(token) {
        if (ws == null) {
            ws = new WebSocket(USERSOCKETURL + token);
            //userService.getEvents();
            //localStorage.removeItem("events");
            //userService.getEvents();
            console.log("Websocket is connect");
            ws.onopen = function live() {
                var timeout = 20000;
            if (ws.readyState == ws.OPEN) {
            ws.send('Ping');
            timerId = setTimeout(live, timeout);
            }else{
            try{
                if (timerId) {
                    clearTimeout(timerId);
                    }
                    ws = new WebSocket(USERSOCKETURL + token);
                    //userService.getEvents();
                    //localStorage.removeItem("events");
                    //userService.getEvents();
                    console.log("Websocket is connect");
                    ws.onopen = function live() {
                        var timeout = 20000;
                    if (ws.readyState == ws.OPEN) {
                    ws.send('Ping');
                    timerId = setTimeout(live, timeout);
                    }
                }
            }catch(e){}

            }
            
                };
            ws.onmessage = function (data) {
                var message = data.data;
              //  new UserWebsocket().serverMessage(data.data);
              function isJson(str) {
                // alert("str = "+str)
                try {
                    JSON.parse(str);
                } catch (e) {
                    // alert('no JSON')
                    return false;
                }
                // alert('yes JSON')
                return true;
            }
            if (isJson(message)) {
                var msg = JSON.parse(message);
                 // console.log("serverMessage: "+msg.data)
                  
                  if (msg.Command === 'event') {
                     
                     
                      eventBus.dispatch("eventsData", msg.data);
                    eventBus.dispatch("eventsDataEvent", msg.data);
                      
                  } else if (message.Command === 'startTick') {
                      // setYvalStart(msg.tick);
                  }
              } else {
                  if (message === 'closeConnection') {
                      //localStorage.removeItem("events");
                      //localStorage.clear();
                          //window.location.reload();
                  }else if(message === 'PasswordChanged'){
                      
                  }
              }
            }
            ws.onerror = function (e) {
                if (timerId) {
                    clearTimeout(timerId);
                    }
                console.log(e.type);

                if(e.type === 'error'){
                    
                    ws=null;
                    //localStorage.clear();
                    //window.location.reload();
                }
            }
            ws.onclose = function(e){
                if (timerId) {
                    clearTimeout(timerId);
                    }
                if (ws != null) {
            
                    ws.close();
                    ws=null;
                            //localStorage.clear();
                            //window.location.reload();
                console.log("Websocket is in disconnected state");
                }
            }
        }
    }
  
    disconnect() {
        // localStorage.clear();
         if (ws != null) {
             
             ws.close();
             ws = null
             //localStorage.removeItem("events");
         console.log("Websocket is in disconnected state");
         }
         
 
     }

    sendData(data) {
        ws.send(data);
    }

}


export default new UserWebsocket();