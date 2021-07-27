export const POSTURL = "http://51.195.176.97:8081/api/auth/"
//export const POSTURL = "http://localhost:8081/api/auth/"
export const POSTURLTest = "http://51.195.176.97:8081/api/req/"
//export const POSTURLTest = "http://localhost:8081/api/req/"
export const USERSOCKETURL = getPort();
export const DEFCOLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', "#eb5e28","#f27f34","#f9a03f","#f6b049","#f3c053","#a1c349","#94b33d","#87a330","#799431","#6a8532"];

function getPort() {
   // let host = document.location.host;
    let host = "51.195.176.97:8081";
   // let host = "localhost:8081";
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