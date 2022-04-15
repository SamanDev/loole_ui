import { USERSOCKETURL, USERSOCKETPUBLICURL } from "const";
//import Dashboard from 'views/Dashboard'
import eventBus from "views/eventBus";
import userService from "services/user.service";
var ws;
var timerId = 0;
var res = false;
class UserWebsocket {
  connect(token, user) {
    //console.log(ws);
    if (ws == null || ws.url.indexOf("public") > -1) {
      if (token) {
        ws = new WebSocket(USERSOCKETURL + token);
      } else {
        ws = new WebSocket(USERSOCKETPUBLICURL);
      }

      //userService.getEvents();
      //localStorage.removeItem("events");
      //userService.getEvents();

      console.log("Websocket is connect");

      ws.onopen = function live() {
        var timeout = 20000;
        if (ws?.readyState == ws?.OPEN) {
          ws?.send("Ping");
          if (ws) {
            eventBus.dispatch("eventsConnect", "");
          }

          setTimeout(function () {
            if (res) {
              timerId = setTimeout(live, timeout);
            } else {
              try {
                if (timerId) {
                  clearTimeout(timerId);
                }
                res = false;
                try {
                  ws.close();
                } catch (e) {}
              } catch (e) {}
            }
            res = false;
          }, 2000);
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

          //alert((msg.Command))
          if (msg.Command === "event") {
            eventBus.dispatch("eventsData", msg.data);
          } else if (msg.Command === "updateUser") {
            eventBus.dispatch("eventsDataUser", msg.data);
          } else if (msg.Command === "eventId") {
            eventBus.dispatch("eventsDataEventDo", msg.data);
          } else if (msg.Command === "startTick") {
            // setYvalStart(msg.tick);
          }
        } else {
          if (message === "closeConnection") {
            //localStorage.removeItem("events");
            // localStorage.clear();
            //window.location.reload();
            ws?.close();
          } else if (message === "PasswordChanged") {
            eventBus.dispatch(
              "eventsDataPass",
              "Your password has been updated."
            );
          } else if (message === "AccountActivated") {
            eventBus.dispatch(
              "eventsDataActive",
              "Your account has been activated."
            );
            //eventBus.dispatch("eventsDC", '');
          } else if (message == "Pong") {
            res = true;
          }
        }
      };
      ws.onerror = function (e) {
        if (timerId) {
          clearTimeout(timerId);
        }
        console.log(e.type);

        if (e.type === "error") {
          ws = null;
          eventBus.dispatch("eventsDC", "");
          // localStorage.clear();
          //window.location.reload();
          //window.location.replace("/auth/login-page");
        }
      };
      ws.onclose = function (e) {
        ws = null;
        eventBus.dispatch("eventsDC", "");
        setTimeout(function () {
          if (ws != null) {
            //eventBus.dispatch("eventsConnect", "");
          } else {
            if (ws == null && token) {
              //eventBus.dispatch("eventsDC", "");
            }
          }
        }, 200);
      };
    }
  }

  disconnect() {
    eventBus.dispatch("eventsDC", "");
    if (ws != null) {
      ws.close();
      ws = null;

      console.log("Websocket is in disconnected state");
    }
  }

  sendData(data) {
    ws.send(data);
  }
}

export default new UserWebsocket();
