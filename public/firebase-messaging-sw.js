importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCGTpxJqdzeBpgV2Uq8KniTQWLHb69DONM",
  authDomain: "loole-b974f.firebaseapp.com",
  projectId: "loole-b974f",
  storageBucket: "loole-b974f.appspot.com",
  messagingSenderId: "30488129618",
  appId: "1:30488129618:web:99f67dea2fe2823b332f8b"
};

   const init = firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging(init);

 
    messaging.onBackgroundMessage(function(payload) {
    
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
  })









