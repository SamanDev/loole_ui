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
    "username": "Guste",
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
      {
        "id": 16,
        "date": "2021-10-22T01:42:23.000+00:00",
        "gameName": "PSN",
        "gamePlatform": "PSN",
        "nickName": "",
        "tagId": "sali",
        "active": false
      },
      {
        "id": 19,
        "date": "2021-10-28T01:07:26.000+00:00",
        "gameName": "CallOfDuty",
        "gamePlatform": "PSN",
        "nickName": "LOOLE",
        "tagId": "ShartiApp",
        "active": false
      },
      {
        "id": 15,
        "date": "2021-10-22T01:33:32.000+00:00",
        "gameName": "8Pool",
        "gamePlatform": "Mobile",
        "nickName": "salar",
        "tagId": "57656",
        "active": false
      },
      {
        "id": 14,
        "date": "2021-10-22T01:33:17.000+00:00",
        "gameName": "XBOX",
        "gamePlatform": null,
        "nickName": "",
        "tagId": "xasx",
        "active": false
      }
    ],
    "userSocialAccounts": [
      {
        "id": 4,
        "date": "2021-10-30T13:05:39.000+00:00",
        "accountName": "Twitter",
        "accountId": "Salar198"
      },
      {
        "id": 10,
        "date": "2021-11-01T20:01:13.000+00:00",
        "accountName": "Twitter",
        "accountId": "Salar198"
      },
      {
        "id": 3,
        "date": "2021-10-30T13:03:32.000+00:00",
        "accountName": "Youtube",
        "accountId": "SalarDoom"
      },
      {
        "id": 9,
        "date": "2021-11-01T20:00:23.000+00:00",
        "accountName": "Twitter",
        "accountId": "3222332"
      },
      {
        "id": 2,
        "date": "2021-10-30T13:02:07.000+00:00",
        "accountName": "Instagram",
        "accountId": "Salar198"
      }
    ]
  }