import React, { useEffect, useState, useContext } from "react";
import Form from "react-validation/build/form";

import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import { Message, Button, Divider } from "semantic-ui-react";
import Swal from "sweetalert2";
import UserContext from "context/UserState";
import {
  getMessaging,
  getToken,
  onMessage,
  onBackgroundMessage,
} from "firebase/messaging";

import { initializeApp } from "firebase/app";
function Active(prop) {
  const [token, setToken] = useState(null);

  const context = useContext(UserContext);
  const { currentUser } = context.uList;

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

    try {
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      var token;
      getToken(messaging, {
        vapidKey:
          "BFj8seYu2V-U2yWrmRyG4zdiX08epdYDYhAL5x6DSoxOLsE_9q3hn7QjrSPthUkp6XBRzSpRdOoF3P3pZfiCnw8",
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
        console.log(
          "New foreground notification from Firebase Messaging!",
          message.notification
        );
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (token) userService.sendPushToken(token);
  }, [token]);
  useEffect(() => {
    Notification.requestPermission().then(function (result) {
      if (result === "default") {
        setToken(null);
        return;
      }

      handleResend();
    });
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
