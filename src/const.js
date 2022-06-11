export const url = "https://loole.gg:8443";
export const POSTURL = url + "/api/auth/";
//export const POSTURLTest = "http://51.195.176.97:8081/api/req/"
export const POSTURLTest = url + "/api/req/";
export const POSTURLAdmin = url + "/api/admin/";
export const USERSOCKETURL = getPort();
export const USERSOCKETPUBLICURL = getPortPablic();
export function startServiceWorker() {
  if ("serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;
      console.log("window.addEventListener(load - swUrl: " + swUrl);

      navigator.serviceWorker
        .register(swUrl)
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
      navigator.serviceWorker.ready.then(() => {
        console.log(
          "This web app is being served cache-first by a service " +
            "worker. To learn more, visit https://bit.ly/CRA-PWA"
        );
      });
    });
  }
}
export const themeColors = [
  "red",
  "orange",
  "blue",
  "green",
  "grey",
  "orange",
  "blue",
  "red",
  "orange",
  "blue",
  "green",
  "grey",
  "red",
  "orange",
  "blue",
  "green",
  "grey",
  "orange",
  "blue",
  "red",
  "orange",
  "blue",
  "green",
  "grey",
];
export const themeDashColors = [
  "red",
  "orange",
  "azure",
  "green",
  "purple",
  "black",
  "red",
  "orange",
  "azure",
  "green",
  "purple",
  "black",
  "red",
  "orange",
  "azure",
  "green",
  "purple",
  "black",
  "red",
  "orange",
  "azure",
  "green",
  "purple",
  "black",
];
export const Colors = [
  "Red",
  "Orange",
  "Yellow",
  "Olive",
  "Green",
  "Teal",
  "Blue",
  "Violet",
  "Purple",
  "Pink",
  "Brown",
  "Grey",
  "Black",
  "Red",
  "Orange",
  "Yellow",
  "Olive",
  "Green",
  "Teal",
  "Blue",
  "Violet",
  "Purple",
  "Pink",
  "Brown",
  "Grey",
  "Black",
];

export const DEFCOLORS = [
  "#db2828",
  "#f2711c",
  "#ffe21f",
  "#b5cc18",
  "#2ecc40",
  "#00b5ad",
  "#2185d0",
  "#6435c9",
  "#a333c8",
  "#e03997",
  "#a5673f",
  "#767676",
  "#1b1c1d",
  "#db2828",
  "#f2711c",
  "#ffe21f",
  "#b5cc18",
  "#2ecc40",
  "#00b5ad",
  "#2185d0",
  "#6435c9",
  "#a333c8",
  "#e03997",
  "#a5673f",
  "#767676",
  "#1b1c1d",
];
export const TrackingID = "UA-83705038-3";
function getPort() {
  // let host = document.location.host;
  //let host = "51.195.176.97:8081";
  let host = "loole.gg:8443";
  let protocol2 = document.location.protocol;
  let protocol = "";
  if (protocol2 == "https:") {
    protocol = "wss://";
  } else {
    protocol = "ws://";
  }
  protocol = "wss://";
  let loc = protocol + host + "/users?token=";
  //console.log("location = "+loc);
  return loc;
}
function getPortPablic() {
  // let host = document.location.host;
  //let host = "51.195.176.97:8081";
  let host = "loole.gg:8443";
  let protocol2 = document.location.protocol;
  let protocol = "";
  if (protocol2 == "https:") {
    protocol = "wss://";
  } else {
    protocol = "ws://";
  }
  protocol = "wss://";
  let loc = protocol + host + "/public";
  //console.log("location = "+loc);
  return loc;
}
export const defUser = {
  accessToken: "",
  registerToken: "",
  type: "LooLe",
  id: 0,
  refer: null,
  balance: 0,
  instagram: null,
  imageUrl: null,
  fullName: "",
  newPass: null,
  birthday: "10/16/2019",
  point: 0,
  weeklyPoint: 0,
  inviteBlock: false,
  chatBlock: false,
  userBlock: false,
  userActivate: true,
  createDate: "2021-10-21T21:26:19.000+00:00",
  firstLogin: "2021-10-21T21:26:19.000+00:00",
  lastLogin: "2021-10-21T21:26:19.000+00:00",
  inviteBlockDate: "2021-10-21T21:26:19.000+00:00",
  chatBlockDate: "2021-10-21T21:26:19.000+00:00",
  username: "Guest",
  email: "",
  password: "",
  country: {
    id: 2,
    value: "TR",
    label: "Turkey",
  },
  roles: [
    {
      id: 1,
      name: "ROLE_USER",
    },
  ],

  cashierGateways: [
    {
      id: 3,
      name: "CoinPayments",
      mode: "CryptoCurrencies",
      active: true,
    },
    {
      id: 2,
      name: "Hamrahcart",
      mode: "IranShetab",
      active: true,
    },
    {
      id: 6,
      name: "VisaGiftCode",
      mode: "VisaGiftCode",
      active: true,
    },
    {
      id: 4,
      name: "Digipay",
      mode: "IranShetab",
      active: true,
    },
    {
      id: 1,
      name: "PerfectMoney",
      mode: "PerfectMoney",
      active: true,
    },
  ],

  userConnectionInfos: null,
  userAnalyses: null,
  usersReports: null,
  userTags: null,
  userSocialAccounts: null,
};
