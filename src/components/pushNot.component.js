import React, { useEffect, useState, useContext } from "react";

import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import { Message, Divider } from "semantic-ui-react";

import UserContext from "context/UserState";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 20000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
function Active(prop) {
  const [token, setToken] = useState("err");

  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  var notification = { title: "test", body: "Your match is ow started" };
  const handleResend = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyCGTpxJqdzeBpgV2Uq8KniTQWLHb69DONM",
      authDomain: "loole-b974f.firebaseapp.com",
      projectId: "loole-b974f",
      storageBucket: "loole-b974f.appspot.com",
      messagingSenderId: "30488129618",
      appId: "1:30488129618:web:99f67dea2fe2823b332f8b",
      measurementId: "G-56RR0GT32B",
    };
    var token = "";
    try {
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          "BEIgQbQRnWKcVNc_Bd433T_MiTKNDTrRjOit7GDDxvSvpQ2wEafBtLxw37jCJ9vVf56A4COIDy3WymYoEOoYZrw",
      })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            //  console.log("currentToken : " + currentToken);
            //  userService.sendPushToken(currentToken);
            token = currentToken;

            setToken(currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // setToken("err");
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          setToken("err");
          // ...
        });
      onMessage(getMessaging(), (message) => {
        Toast.fire({
          icon: "success",
          title: message.notification.body,
        });

        console.log(
          "New foreground notification from Firebase Messaging!",
          message.notification
        );
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (token && token != "err") userService.sendPushToken(token);
  }, [token]);
  useEffect(() => {
    try {
      Notification.requestPermission().then(function (result) {
        if (result === "default" && token == "err") {
          setToken(null);
          return;
        }

        handleResend();
      });
    } catch (e) {
      setToken("err");
    }
  }, []);
  if (token == null) {
    return (
      <>
        <Message negative onClick={handleResend} style={{ cursor: "pointer" }}>
          <Message.Header>Turn On Notification and Get Reward</Message.Header>
        </Message>

        <Divider hidden />
      </>
    );
  } else {
    return null;
  }
}
export default withRouter(Active);
