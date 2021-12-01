//export const POSTURL = "http://51.195.176.97:8081/api/auth/"
export const POSTURL = "https://loole.gg:8443/api/auth/"
//export const POSTURLTest = "http://51.195.176.97:8081/api/req/"
export const POSTURLTest = "https://loole.gg:8443/api/req/"
export const USERSOCKETURL = getPort();
export const DEFCOLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', "#eb5e28","#f27f34","#f9a03f","#f6b049","#f3c053","#a1c349","#94b33d","#87a330","#799431","#6a8532"];

function getPort() {
   // let host = document.location.host;
    //let host = "51.195.176.97:8081";
    let host = "loole.gg:8443";
    let protocol2 = document.location.protocol;
    let protocol = "";
    if(protocol2 == "https:"){
        protocol = "wss://";
    }else{
        protocol = "ws://";
    }
    protocol = "wss://";
    let loc =  protocol+host+"/users?token=";
    //console.log("location = "+loc);
    return loc;
}
export const defUser = {
    "accessToken": "",
    "registerToken": "",
    "type": "LooLe",
    "id": 0,
    "refer": null,
    "balance": 0,
    "instagram": null,
    "imageUrl": null,
    "fullName": "",
    "newPass": null,
    "birthday": "10/16/2019",
    "point": 0,
    "weeklyPoint": 0,
    "inviteBlock": false,
    "chatBlock": false,
    "userBlock": false,
    "userActivate": true,
    "createDate": "2021-10-21T21:26:19.000+00:00",
    "firstLogin": "2021-10-21T21:26:19.000+00:00",
    "lastLogin": "2021-10-21T21:26:19.000+00:00",
    "inviteBlockDate": "2021-10-21T21:26:19.000+00:00",
    "chatBlockDate": "2021-10-21T21:26:19.000+00:00",
    "username": "Guest",
    "email": "",
    "password": "",
    "country": {
      "id": 2,
      "value": "TR",
      "label": "Turkey"
    },
"roles":
    [
        {
          "id": 1,
          "name": "ROLE_USER"
        }
      ],
    "userTags": [
      
    ],
    "userSocialAccounts": [
      
    ],
    "cashierGateways":[
        {
          "id": 1,
          "name": "Hamrahcart",
          "mode": "IranShetab",
          "active": true
        },
        {
          "id": 2,
          "name": "PerfectMoney",
          "mode": "PerfectMoney",
          "active": true
        }
      ]
  }