import { USERSOCKETURL, USERSOCKETPUBLICURL, defUser } from "const";
//import Dashboard from 'views/Dashboard'
import eventBus from "views/eventBus";
import userService from "services/user.service";
import { getMessaging, getToken ,onMessage} from "firebase/messaging";
import { initializeApp } from 'firebase/app';

var ws;
var ws2;
var timerId = 0;
var res = false;
class UserWebsocket {
  connect(token, user) {
    //console.log(ws);
    if (token) {
     
        ws2?.close();
        ws2 = null;
        if (ws == null)  {
        ws = new WebSocket(USERSOCKETURL + token);
        console.log("Websocket user is connected");
        }
        const firebaseConfig = {
          apiKey: "AIzaSyCGTpxJqdzeBpgV2Uq8KniTQWLHb69DONM",
  authDomain: "loole-b974f.firebaseapp.com",
  projectId: "loole-b974f",
  storageBucket: "loole-b974f.appspot.com",
  messagingSenderId: "30488129618",
  appId: "1:30488129618:web:99f67dea2fe2823b332f8b",
  measurementId: "G-56RR0GT32B"
        };
        
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
getToken(messaging, { vapidKey: "BFj8seYu2V-U2yWrmRyG4zdiX08epdYDYhAL5x6DSoxOLsE_9q3hn7QjrSPthUkp6XBRzSpRdOoF3P3pZfiCnw8" }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("currentToken : "+currentToken)
    userService.sendPushToken(currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
onMessage(getMessaging(), (message) => {
  console.log(
    'New foreground notification from Firebase Messaging!',
    message.notification
  );
  alert(message.notification.body)

})
    }else {
      ws?.close();
      ws = null;
      if (ws2 == null)  {
        ws2 = new WebSocket(USERSOCKETPUBLICURL);
        console.log("Websocket public is connected");
      }
      }
      //eventBus.dispatch("eventsConnect", "");
      //userService.getEvents();
      //localStorage.removeItem("events");
      //userService.getEvents();
     
     ws.onopen = function live() {
      if (ws?.readyState == ws?.OPEN) {
        if (ws) {
          eventBus.dispatch("eventsConnect", "");
        }
      }
      /*   var timeout = 20000;
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
              //  res = false;
                try {
                  ws = null;
                  ws.close();
                } catch (e) {}
              } catch (e) {}
            }
           // res = false;
          }, 2000);
        }
      };*/
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
            ws = null;
          //  eventBus.dispatch("eventsDC", "");
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
      /*  if (timerId) {
          clearTimeout(timerId);
        }
        console.log(e.type);*/

        if (e.type === "error") {
          //localStorage.setItem("user", JSON.stringify(defUser));
        //  eventBus.dispatch("eventsDC", "");
          // localStorage.clear();
          //window.location.reload();
          //window.location.replace("/auth/login-page");
        }
      };
      ws.onclose = function (e) {
        setTimeout(function () {
        if (ws2 == null && token) {
          eventBus.dispatch("eventsDC", "");
        }
      }, 1000);
        //ws?.close();
        //ws = null;
      //  console.log(ws);
      //  console.log(token);
        // localStorage.setItem("user", JSON.stringify(defUser));
        //eventBus.dispatch("eventsDC", "");
      /*  setTimeout(function () {
          if (ws != null) {
            eventBus.dispatch("eventsConnect", "");
          } else {
            if (ws == null && token) {
              eventBus.dispatch("eventsDC", "");
            }
          }
        }, 200);*/
      };
    }
  }

  disconnect() {
    if (ws != null) {
      ws?.close();
      ws = null;
      //   ws = null;
      //eventBus.dispatch("eventsDC", "");
      console.log("Websocket is in disconnected state");
      //eventBus.dispatch("eventsDC", "");
    } else {
      //ws?.close();
      //eventBus.dispatch("eventsDC", "");
    }
  }

  sendData(data) {
    ws.send(data);
  }
}

export default new UserWebsocket();
