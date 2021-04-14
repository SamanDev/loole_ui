import { USERSOCKETURL } from 'const';

var ws;

class UserWebsocket {
    
    connect(token) {
        ws = new WebSocket(USERSOCKETURL + token);
        console.log(ws);
        ws.onmessage = function (data) {
            serverMessage(data.data);
        }
    
    
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

    serverMessage(message) {
        console.log("message: " + message);
    }


}
export default new UserWebsocket();