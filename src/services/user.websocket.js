import { USERSOCKETURL } from 'const';
//import Dashboard from 'views/Dashboard'
import eventBus from "views/eventBus";
import userService from "services/user.service";
var ws;

class UserWebsocket {

   

    connect(token) {
        if (ws == null) {
            ws = new WebSocket(USERSOCKETURL + token);
            //userService.getEvents();
            //localStorage.removeItem("events");
            //userService.getEvents();
            console.log("Websocket is connect");
            ws.onmessage = function (data) {
                new UserWebsocket().serverMessage(data.data);
            }
            ws.onerror = function (e) {
                console.log(e.type);

                if(e.type === 'error'){
                    
                    ws=null;
                    localStorage.clear();
                    window.location.reload();
                }
            }
        }
    }
    serverMessage(message) {
       
        if (isJson(message)) {
          var msg = JSON.parse(message);
           // console.log("serverMessage: "+msg.data)
            
            if (msg.Command === 'event') {
               
               
                eventBus.dispatch("eventsData", msg.data);
                //eventBus.dispatch("eventsDataEvent", msg.data);
                
            } else if (message.Command === 'startTick') {
                // setYvalStart(msg.tick);
            }
        } else {
            if (message === 'closeConnection') {
                //localStorage.removeItem("events");
                localStorage.clear();
                    window.location.reload();
            }
        }
        //console.log("message: " + message);

    }
    disconnect() {
       // localStorage.clear();
        if (ws != null) {
            
            ws.close();
            ws=null;
                    localStorage.clear();
                    window.location.reload();
        console.log("Websocket is in disconnected state");
        }
        

    }

    sendData(data) {
        ws.send(data);
    }

}
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
export default new UserWebsocket();