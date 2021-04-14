export const POSTURL = "http://51.195.176.97:8081/api/auth/"
//export const POSTURL = "http://192.168.1.107:8080/api/auth/"
export const POSTURLTest = "http://51.195.176.97:8081/api/test/"
export const USERSOCKETURL = getPort();
export const DEFCOLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'];

function getPort() {
   // let host = document.location.host;
    let host = "51.195.176.97:8081";
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