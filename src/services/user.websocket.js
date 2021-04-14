import { USERSOCKETURL } from 'const';
//import Dashboard from 'views/Dashboard'
import eventBus from "views/eventBus";
var ws;

class UserWebsocket {

   

    connect(token) {
        if (ws == null) {
            ws = new WebSocket(USERSOCKETURL + token);
           // console.log(ws);
            ws.onmessage = function (data) {
                new UserWebsocket().serverMessage(data.data);
            }
            ws.onerror = function (e) {
                console.log(e.type);
                if(e.type === 'error'){
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
                
            } else if (message.Command === 'startTick') {
                // setYvalStart(msg.tick);
            }
        } else {
            if (message === 'closeConnection') {
                new UserWebsocket().disconnect();
            }
        }
        // console.log("message: " + message);

    }
    disconnect() {

        if (ws != null) {
            ws.close();
        }
        console.log("Websocket is in disconnected state");

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