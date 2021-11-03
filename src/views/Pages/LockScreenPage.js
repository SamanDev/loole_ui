import React, { Component } from "react";
import { useParams } from "react-router-dom"
import Avatar from "react-avatar";
import $ from "jquery";
import { NavLink, Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import CurrencyFormat from "react-currency-format";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Pagination,
  Col,
  Table,
  Row,
  Form,
  FormCheck,
  ProgressBar,
  ListGroup,
  Spinner,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import { useAllEvents,useEvent } from "services/hooks"
import Active  from "components/active.component";
import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import AdminNavbar from "components/Navbars/ChatNavbar.js";
import Switch from "react-bootstrap-switch";
import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";
import AuthService from "services/auth.service";
import League from "server/league";
import eventBus from "views/eventBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import {
  setAvatar,
  getColor,
  getIcon,
  renderer,
  getQueryVariable,
  getCode,
  getGroupBadge,
  getGroupBadgeList,
  getGroupBadgePrice,
  getModalTag,
  getGameTag,
  getMatchTitle,
  haveGameTag,
  getPlayerTag,
  isJson,
  haveAdmin
} from "components/include";
import { UPLOADURL, POSTURLTest } from "const";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

var firstLoad = true;
var isLoading = true;

const API_URL_TEST = POSTURLTest;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
function genMatch(lvl, matchCount, title) {
  var matchSample = {
    startTime: 1619728571000,
    winner: "Salar",
    matchPlayers: [
      {
        ready: false,
        username: "vahid",
      },
      {
        ready: false,
        username: "Yaran12",
      },
    ],
  };
  var matchSampleull = {
    startTime: 1619728571000,
    winner: null,
    matchPlayers: [
      {
        id: 257,
        username: null,
        tagName: null,
        ready: false,
      },
      {
        id: 257,
        username: null,
        tagName: null,
        ready: false,
      },
    ],
  };
  var nullmatch = {
    id: 100000,
    level: 1,
    title: "",
    matches: [],
  };
  nullmatch.level = lvl;
  nullmatch.title = title;
  for (let index = 0; index < matchCount; index++) {
    if (lvl == 3 && 12 == 1) {
      nullmatch.matches.push(matchSample);
    } else {
      nullmatch.matches.push(matchSample);
    }
    //e.log(item.players[index].username)
    if (index < 9) {
      // nullmatch.matches.matchPlayers[0].push(item.players[index])
    }
  }

  return nullmatch;
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
 //console.log(item);
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}
var isInPlayers = false;
var matchidFind = []
var lists = [];
var item = false;
var dateExpired = null;
var dateStart = null;
            var icEnd = 0;
            var icStart = 0;
            var icStartL = 0;
            var nullplayer = {
              id: 100000,
              username: false,
              rank: null,
              winAmount: null,
              ready: false,
            };
            var mymatchFind = null;
            var matchLevelFind =null
            var isJoin = false;
    var activePlayer = 0;
class LockScreenPage extends Component {
  constructor(props) {
    super(props);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLeaveMatch = this.handleLeaveMatch.bind(this);
    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.handleHowStream = this.handleHowStream.bind(this);
    this.reGetevents = this.reGetevents.bind(this);
    this.fileUpload = React.createRef();
    this.showDetails = this.showDetails.bind(this);

    this.editEvent = this.editEvent.bind(this);
    this.setProgress = this.setProgress.bind(this);

    this.handleChatUpload = this.handleChatUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.setMatchId = this.setMatchId.bind(this);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleSaveTags = this.handleSaveTags.bind(this);
    this.handleTagForm = this.handleTagForm.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setUserTag = this.setUserTag.bind(this);
    this.state = {
      event: this.reGetevents(),
      events: null,
      currentUserTag: AuthService.getCurrentUser(),
      tag: "R0P0C8R89",
      eventid: getQueryVariable("id"),
      matchid: getQueryVariable("matchid"),
      curPlayerReady: false,
      progress: 0,
      selectedFile: null,
      isloading: false,
      isUpLoading: false,
      progressLable: "I Win",
      league: League,
      gameName: '',
        gamePlatform: '',
        gameID: '',
        gameNickname: '',
    };
  }

  componentDidMount() {
    Swal.close();
    
    
    this._isMounted = true;
    if (this._isMounted) {
      eventBus.on("eventsDataEventDo", (event) => {
         isJoin = false;
          item = false;
     activePlayer = 0;
      isInPlayers = false;
 matchidFind = []
 lists = [];

             icEnd = 0;
             icStart = 0;
             icStartL = 0;
            
        var newitem = this.editEvent(event);
        try{
          this.setEvent(JSON.parse(newitem));
          //events = JSON.parse(event);
        }catch(err){
          this.setEvent((newitem));
         // events = (event);
        }
        
        
        //this.reGetevents();
        console.log("socket events: "+JSON.stringify(newitem));
      });
      eventBus.on("eventsDataEvent", (event) => {
         
       this.reGetevents();
        try{
          //this.setEvent(JSON.parse(event));
          //events = JSON.parse(event);
        }catch(err){
          //this.setEvent((event));
         // events = (event);
        }
        //this.setEvent(JSON.parse(event));
        //const ids = event.map(entity => entity.id);
        //console.log("socket events: "+JSON.stringify(event));
        //this.setEvent(event);
      });
    }
  }
  componentWillUnmount() {
    //this._isMounted = false;
  }
  setSelectedGameName(e) {
    
    //this.handleTagForm(e,getBlockGameModesVal(e))
  }
  setSelectedTag(e,p) {
    if(p=='PS4'||e=='PS4'){e='PSN';p='PSN';}
  if(p=='PS5'||e=='PS5'){e='PSN';p='PSN';}
  if(p=='XBOX'||e=='XBOX'){e='XBOX';p='XBOX';}
    this.setState({
      gameName: e.replace(' Warzone',''),
      gamePlatform: p
    });
    
    this.handleTagForm(e.replace(' Warzone',''),p)
  }
  setUserTag(e) {
    this.setState({
      currentUserTag: e
    });
    
  }
  setProgress(e) {
    this.setState({
      progress: e,
      progressLable: e + "%",
    });
  }
  setEvent(e) {
    this.setState({
      event: e,
      events: e,
    });

    $("#jsonhtml").html($("#jsonhtml2").text());
  }
  setMatchId(e) {
    this.setState({
      matchid: e,
    });

  }
  showFileUpload() {
    this.fileUpload.current.click();
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: this.fileUpload.current.files[0],
    });

    setTimeout(() => {
      this.handleChatUpload();
    }, 500);
  };
  handleHowStream(e) {
    e.preventDefault();

    Swal.fire({
      title: "How to Stream",
      html: `<div class="card-plain card text-left" >
          <ol><li><b>Join Tournament</b>
          <p>
          Click the Join Tournament button above to participate in the event.</p></li>
          <li><b>Connect Twitch          </b>
          <p>
          Go to your profile and connect Twitch account to Loole.gg</p></li>
          <li><b>Start Streaming          </b>
          <p>
          If you've joined the event and connected your Twitch, just start streaming and that's it!</p></li>
          </ol>
   
          
          `,
      icon: "question",
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonText: `Go to Cashier`,
      canceleButtonText: `Back`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.props.history.push("/panel/cashier");
      }
    });
  }
  handleSaveTags() {
    Swal.fire({
      title: '<br/>Please Wait...',
      text: 'Is working..',
      customClass:'tag',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
          Swal.showLoading()
      }
  })
  
    userService
      .saveTags(
       
        this.state.gameName,
        this.state.gamePlatform,
        this.state.gameID,
        this.state.gameNickname,

      )
      .then(
        (response) => {
         
          let jsonBool = isJson(response);
   
          if (jsonBool) {
           
              this.setUserTag(response)
              localStorage.setItem("user", JSON.stringify(response));
              Swal.fire("", "Data saved successfully.", "success");
          
          } else {
           
              Swal.fire("", response, "error");
           
          }
        
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          Swal.fire("Error!", resMessage, "error");
        }
      );
  }
  handleTagForm(game,platform) {
   
                const resetPw = async () => {
                  const swalval = await Swal.fire(getModalTag(game));
        
                  let v = (swalval && swalval.value) || swalval.dismiss;
                  console.log(platform);
                  if (v) {
                    if (v.tagid) {
                      
                        if (v.tagid == game+"2") {
                          this.handleTagForm(game+'2')
                        }else if (v.tagid == game+"3") {
                          this.handleTagForm(game+'3')
                        }else{
                          this.setState({
                            gameID: '',
                            gameNickname: '',
                          });
                          if (v.tagid != "") {
                            this.setState({
                              gameID: v.tagid.replace('#',''),
                              
                            });
                          }
                          if (v.tagname && v.tagname != "") {
                            this.setState({
                              gameNickname: v.tagname,
                              
                            });
                          }
                          if (v.tagplatform && v.tagplatform != "") {
                            this.setState({
                              gamePlatform: v.tagplatform,
                              
                            });
                          }
                          
                            console.log(this.state);
                            this.handleSaveTags();
                          
                        }
                        
                      }
                      
                      //setformdata(swalval);
                      
                    
                  }
                };
        if(!haveGameTag(game,this.state.currentUserTag.userTags))                  resetPw();
              }
  reGetevents(){
    if(getQueryVariable("id") ){
      
      userService.getEventById(getQueryVariable("id"))
      
    }
   
  }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    userService.joinEvent(this.state.eventid).then(
      (response) => {
        this.setState({
          isloading: false,
        });
        //alert(response)
        if (response.indexOf("successful") > -1) {
         // this.reGetevents();
          Toast.fire({
            icon: "success",
            title: "Joined.",
          });
          
        } else {
          if (response == "balanceError") {
            var resMessage =
              "To enter this event you need to have more balance!";
            Swal.fire({
              title: "Error!",
              text: resMessage,
              icon: "error",
              showCancelButton: true,
              confirmButtonText: `Go to Cashier`,
              canceleButtonText: `Back`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.props.history.push("/panel/cashier");
              }
            });
          } else if (response == "tagError") {
            this.setSelectedTag(this.state.event.gameName,this.state.event.gameConsole)
          }
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        Swal.fire("", resMessage, "error");
      }
    );
  }
  handleClashFinished(e) {
    this.setState({
      isloading: true,
    });
    userService
      .saveTags("ClashRoyale", "finish", this.state.tag, this.state.eventid)
      .then(
        (response) => {
          this.setState({
            isloading: false,
          });
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {}
      );
  }
  handleLoseMatch(e) {
    this.setState({
      isloading: true,
    });
    if(this.state.matchid){
      userService.loseEvent(this.state.eventid,this.state.matchid).then(
        (response) => {
          //this.reGetevents();
          
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {}
      );
    }else{
      userService.loseEvent(this.state.eventid).then(
        (response) => {
          //this.reGetevents();
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {}
      );
    }

    
  }
  handleChatUpload = () => {
    this.setState({
      progress: 1,
      progressLable: "0%",
      isUpLoading: true,
    });
    let uploadInfo = new FormData();
    uploadInfo.append("id", this.state.eventid);
    if(this.state.matchid){uploadInfo.append("idMatch", this.state.matchid);}
    uploadInfo.append("file", this.state.selectedFile);
    
    //console.log(uploadInfo);
    axios
      .post(API_URL_TEST + "uploadFile", uploadInfo, {
        headers: uploadHeader(),
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          this.setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        this.setState({
          progress: 0,
          progressLable: "I win",
          isUpLoading: false,
        });
        document.documentElement.classList.toggle("nav-open");
      })
      .catch((error) => {
        alert(error.response.data.error);
        this.setState({
          progressLable: "I win",
          isUpLoading: false,
        });
      });
  };
  handleDelete(e) {
    e.preventDefault();

    userService.deleteEvent(this.state.eventid).then(
      (response) => {
        this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handleLeaveMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    userService.leaveEvent(this.state.eventid).then(
      (response) => {
        if (response.indexOf("successful") > -1) {
          this.setState({
            isloading: false,
          });
          //this.reGetevents();
          Toast.fire({
            icon: "success",
            title: "UnJoined.",
          });
        }
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handlechangeReadyEvent(checked) {
    firstLoad = false;
    this.setState({ curPlayerReady: checked });
    userService.changeReadyEvent(this.state.eventid).then(
      (response) => {
        if (response == "changeReadyEvent successful") {
          Toast.fire({
            icon: "success",
            title: "Updated.",
          });
          this.reGetevents();
        }
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handlecAlertLost(checked) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure? ",
      icon: "question",
      iconColor: "#FB404B",
      text: "Please confirm your lose.",
      customClass: "dark",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Yes, I lost.",

      cancelButtonText: "Back",
      confirmButtonColor: "#FB404B",
      cancelButtonColor: "rgba(255, 255, 255,.2)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleLoseMatch();
      }
    });
  }
  showDetails(player){
$('.gdetails').addClass('hide');
$('.gdetails.no'+player).removeClass('hide');

  }
  handlecAlertWin(checked) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Confirm needed",
      text: "Upload a  video to approve  your win.",
      icon: "info",
      iconColor: "#87CB16",
      customClass: "dark",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Upload video",

      cancelButtonText: "Back",
      confirmButtonColor: "#87CB16",
      cancelButtonColor: "rgba(255, 255, 255,.2)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUpload.current.click();
      }
    });
  }
  editEvent(event) {
    var getItem = event
    item = (getItem);
    
  
    if (typeof item === "undefined") {
      //this.props.history.push("/panel/dashboard");
    }
    
    if (item.gameMode == "Tournament") {
      if (!item.tournamentPayout) {
        item.tournamentPayout = "1-8, 65.00, 35.00|9-64, 50.00, 30.00, 20.00";
      }
    }
    if (item.gameMode == "League") {
      if (!item.scoreTemplate) {
        item.scoreTemplate = {
          "kills": 20,
          "damageDone": 0.06,
          "timePlayed": 0.04,
          "teamPlacement": [
            {
              "type": "eq",
              "trigger": "1",
              "multiplier": "0",
              "addition": "240",
              "altText": "1st Place"
            },
            {
              "type": "lte",
              "trigger": "3",
              "multiplier": "0",
              "addition": "60",
              "altText": "2nd or 3rd Place"
            },
            {
              "type": "lte",
              "trigger": "8",
              "multiplier": "0",
              "addition": "20",
              "altText": "4th to 8th Place"
            }
          ]
        };
      }
    }
    
    if (item.gameMode == "League") {
      item.tournamentPayout='1-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00|11-20, 45.00, 28.00, 17.00, 10.00|21-40, 36.00, 23.00, 15.00, 11.00, 8.00, 7.00|41-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30'
    }
    
    
    
    if (!item.winner) {
      item.winner = [];
      item.winner.push(nullplayer);
    }
    if (!item.rules) {
      item.info = {
        conditions: [
          "Thank you for participating in our COD: Warzone Beta tournament",
          "During the Beta scores may be altered, removed or updated as we test the implementation of our scoring systems",
          "Only games played after you join the tournament are counted",
          "SMURF accounts are not allowed on Repeat.gg and will be banned",
        ],
      };
      item.rules =
        "<p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>Repeat.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>";
      item.winner.push(nullplayer);
    }
    if (!item.matchLevel) {
      item.matchLevel = [];
      if (item.totalPlayer == 4) {
       
        item.matchLevel.push(genMatch(1, 2, "SemiFinal"));
        item.matchLevel.push(genMatch(2, 1, "Final"));
      }
      if (item.totalPlayer == 8) {
        item.matchLevel.push(genMatch(1, 4, "Round 1"));
        item.matchLevel.push(genMatch(2, 2, "SemiFinal"));
        item.matchLevel.push(genMatch(3, 1, "Final"));
      }
      if (item.totalPlayer == 16) {
        item.matchLevel.push(genMatch(1, 8, "Round 1"));
        item.matchLevel.push(genMatch(2, 4, "Round 2"));
        item.matchLevel.push(genMatch(3, 2, "SemiFinal"));
        
        item.matchLevel.push(genMatch(4, 1, "Final"));
        //item.matchLevel.push(genMatch(4, 1, "3rd Place"));
      }
      if (item.totalPlayer == 32) {
        item.matchLevel.push(genMatch(1, 16, "Round 1"));
        item.matchLevel.push(genMatch(2, 8, "Round 2"));
        item.matchLevel.push(genMatch(3, 4, "Round 3"));
        item.matchLevel.push(genMatch(4, 2, "SemiFinal"));
        
        item.matchLevel.push(genMatch(5, 1, "Final"));
        //item.matchLevel.push(genMatch(5, 1, "3rd Place"));
      }
    }
                var old = JSON.stringify(item).replace(/"Tournament Player1"/g, false).replace(/"Tournament Player"/g, false); //convert to JSON string
                var newArray = JSON.parse(old);
                newArray.current_brackets = [];
                newArray.potential_brackets = [];
                 item = newArray;
    
        //var events = eventGet;
        
        if (item.tournamentPayout) {
          var payArr = item.tournamentPayout.split("|");
          var totalPay = item.prize
          for (var i = 0; i < payArr.length; i++) {
            var paylvl = payArr[i].split(", ");
            var payplyer = paylvl[0].split("-");
        var tItem = item.players.length;
        if(item.status=='Pending' || item.gameMode == "League"){tItem = item.totalPlayer}
            // console.log(payplyer[0])
            if (
              parseInt(payplyer[0]) <= tItem &&
              parseInt(payplyer[1]) >= tItem
            ) {
              for (var j = 1; j < paylvl.length; j++) {
                if(paylvl[j].indexOf('x')==-1){paylvl[j] = paylvl[j]+'x1'}
                var intX = paylvl[j].split("x");
                item.current_brackets.push({
                  prize: (intX[0]* totalPay) / 100,
                  percent: intX[0],
                number: intX[1],
                });
              }
            }
          }
          for (var i = payArr.length - 1; i < payArr.length; i++) {
            
            var paylvl = payArr[i].split(", ");
            var payplyer = paylvl[0].split("-");
            var tItem = item.players.length;
        if(item.status=='Pending' || item.gameMode == "League"){tItem = item.totalPlayer}
            if (
              parseInt(payplyer[0]) <= tItem &&
              parseInt(payplyer[1]) >= tItem
            ) {
            for (var j = 1; j < paylvl.length; j++) {
              if(paylvl[j].indexOf('x')==-1){paylvl[j] = paylvl[j]+'x1'}
              var intX = paylvl[j].split("x");
              item.potential_brackets.push({
                prize: (intX[0] * totalPay) / 100,
                percent: intX[0],
                number: intX[1],
              });
            }
          }
          }
        }
    
         lists = item.matchTables;
        matchidFind = item.matchTables[0];
        
        if(this.state.matchid){
          lists.map((tblmatch, w) => {
            //console.log(tblmatch.id == parseInt(this.state.matchid))
            if(parseInt(tblmatch.id) == parseInt(this.state.matchid)){
               matchidFind = tblmatch;
            }
          }
      
          )
          
            //matchidFind = lists.filter( (list) => list.id === );
          }
          if((item.status=='InPlay' || item.status=='Pending') && item.gameMode=='Tournament'){
            lists.map((tblmatch, w) => {
              if(tblmatch.status=='InPlay' || tblmatch.status=='Pending'){
                if(!matchLevelFind){matchLevelFind = tblmatch;}
              }
              if(tblmatch.status!='Finished' && (tblmatch.matchPlayers[0].username==this.state.currentUserTag.username || tblmatch.matchPlayers[1].username==this.state.currentUserTag.username)){
                mymatchFind = tblmatch;
              }
            }
        
            )
            
              //matchidFind = lists.filter( (list) => list.id === );
            }
        //matchidFind.status = 'InPlay'
        var timestamp = item.expire;
        // console.log(timestamp);
        if (timestamp.indexOf("-") > -1) {
          var timestamp = toTimestamp(timestamp);
        }
        //console.log(timestamp);
       
         dateStart = item.startTime;
         dateExpired = item.expire;
        
        if (matchidFind && item.gameMode != "Tournament") {
          if (!item.players[1]) {
            item.players.push(nullplayer);
          }
          if (matchidFind && !matchidFind.matchPlayers[1]) {
            matchidFind.matchPlayers.push(nullplayer);
          }
          matchidFind.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
         isInPlayers = false;
        if (item.gameMode != "League") {
        if((matchidFind.matchPlayers[0].username ==
          this.state.currentUserTag.username ||
          matchidFind.matchPlayers[1].username ==
            this.state.currentUserTag.username)){
              isInPlayers = true;
            }
          }
        if(item.gameMode == "Tournament" && !this.state.matchid){
          var expiryDate = new Date(dateExpired);
          expiryDate.setHours(expiryDate.getHours() + matchidFind.level);
        }
    return item;
  }
  render() {
    var { progress, isUpLoading, progressLable, event,events, eventid,currentUserTag } = this.state;
    var currentUser = currentUserTag;
    
    
    //const { id } = useParams();
    //var { data: eventGet , isLoading } = useEvent(eventid)
   // var eventGet = false;
   
    if (  !event) {
      
      //this.reGetevents()
      

      return (
        <>
          <div
            className="full-page lock-page"
            data-color="black"
            style={{ height: "100vh", overflow: "auto" }}
            data-image={require("assets/img/bg.jpg").default}
          >
            <div
              className="content "
              style={{
                fontSize: 50,
                color: "#fff",
                position: "relative",
                zIndex: "23",
              }}
            >
              <Container className="text-center">
                <h4 style={{ textAlign: "center" }}>
                  Loading
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                </h4>
              </Container>
            </div>
            <div
              className="full-page-background"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/bg.jpg").default + ")",
              }}
            ></div>
          </div>
        </>
      );
            }
            if (  !event.gameName) {
      
              //this.reGetevents()
              
        
              return (
                <>
                  <div
                    className="full-page lock-page"
                    data-color="black"
                    style={{ height: "100vh", overflow: "auto" }}
                    data-image={require("assets/img/bg.jpg").default}
                  >
                    <div
                      className="content "
                      style={{
                        fontSize: 50,
                        color: "#fff",
                        position: "relative",
                        zIndex: "23",
                      }}
                    >
                      <Container className="text-center">
                      <Button
                                    className="btn-round actbtn hid2e"
                                    onClick={this.handleDelete}
                                    variant="primary"
                                  >
                                    Delet Match
                                  </Button>
                      </Container>
                    </div>
                    <div
                      className="full-page-background"
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/bg.jpg").default + ")",
                      }}
                    ></div>
                  </div>
                </>
              );
                    }
           
    

    
   
    return (
      <>
        <div className="wrapper">
          {matchidFind && item.gameMode != "Tournament" ? (
            <Chatbar
              eventID={eventid}
              eventstatus={item.status}
              masterplayer={matchidFind.matchPlayers[0].username}
              secondplayer={matchidFind.matchPlayers[1].username}
              eventchats={item.chats}
              chats={matchidFind.matchChats}
              username={currentUser}
            />
          ) : (
            <>
            {this.state.matchid ? (
            <Chatbar
              eventID={eventid}
              matchID={this.state.matchid}
              eventstatus={item.status}
              masterplayer={matchidFind.matchPlayers[0].username}
              secondplayer={matchidFind.matchPlayers[1].username}
              eventchats="null"
              chats={matchidFind.matchChats}
              username={currentUser}
            />
          ) : (
            <Chatbar
              eventID={eventid}
              eventstatus={item.status}
              masterplayer="null"
              secondplayer="null"
              eventchats={item.chats}
              chats="null"
              username={currentUser}
            />
          )}
            </>
           
          )}

          <div className="main-panel lobby">
            <div
              className="full-page lock-page"
              data-color="black"
              style={{ height: "100vh", overflow: "auto" }}
              data-image={require("assets/img/bg.jpg").default}
            >
              <AdminNavbar page="dashboard" />

              <div className="content d-flex align-items-center p-0">
                <Container style={{ marginTop: 50 }}>
                  <Active/>
                {(getQueryVariable("matchid")) ? (
                              
                              <Link to={"/panel/lobby?id="+item.id} className="btn actbtn btn-danger btn-round "> Back </Link>
                            ):(
                              <>
                              {getQueryVariable("ref")? (
                              
                              <Link to={"/panel/"+getQueryVariable("ref")} className="btn  actbtn btn-danger btn-round "> Back </Link>
                              ):(
                                <Link to="/panel/dashboard" className="btn actbtn btn-danger btn-round "> Back </Link>
                                )}
                                </>
                            )}
                              {(haveAdmin(currentUser.roles))&&(
              <>
               <Button
                                    className="btn-round actbtn hid2e"
                                    onClick={this.handleDelete}
                                    variant="primary"
                                  >
                                    Delet Match
                                  </Button>
              </>
            )}
                             
                              
                                 
                                  
                               
                  {item.gameMode == "League" ? (
                    <Col className="mx-auto" lg="10" md="11">
                      <Card
                        className="card-lock text-center card-plain card-league"
                        style={{ color: "#fff" }}
                      >
                        <Card.Header>
                          <Row>
                            <Col
                              xs="12"
                              style={{
                                lineHeight: "20px",
                                color: "#fff",
                                fontSize: "20px",
                              }}
                            >
                              {getGroupBadge(item.inSign, item.amount, "")}
                              <h5 style={{ marginTop: 5 }}>
                                {item.gameName} <br />
                                <small>{item.gameMode}</small> <br />
                                <small className="text-muted">
                                  <FontAwesomeIcon
                                    fixedWidth
                                    icon={getIcon(item.gameConsole)}
                                  />{" "}
                                  {item.gameConsole}
                                </small>
                              </h5>
                              {getGroupBadgePrice(item.outSign, item.prize , "")}
                              <small>
                                {item.players.map((user, z) => (
                                  <span key={z}>
                                    {currentUser.username == user.username &&
                                      (isJoin = true)}
                                    {z < 5 ? (
                                      <>
                                        {z < 4 ? (
                                          <a href={"/user/"+user.username}  target="_blank">
                                          <Avatar
                                            size="25"
                                            title={user.username}
                                            round={true}
                                            name={setAvatar(user.username)}
                                          />
                                          </a>
                                        ) : (
                                          <Avatar
                                            size="25"
                                            round={true}
                                            value={
                                              "+" + (item.players.length - 4)
                                            }
                                            color="gray"
                                          />
                                        )}
                                      </>
                                    ) : null}
                                  </span>
                                ))}
                              </small>
                              <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 20,
                                        }}
                                      >
                                        {item.players.length}/{item.totalPlayer}
                                      </small>
                                      <ProgressBar
                                        animated
                                        variant="danger"
                                        now={
                                          (item.players.length /
                                            item.totalPlayer) *
                                          100
                                        }
                                        style={{
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          maxWidth: "50%",
                                        }}
                                      />
                              <VerticalTimeline
                                layout="1-column-left"
                                className="hide2"
                                style={{
                                  marginLeft: "-30px",
                                  marginRight: "-30px",
                                  width: "110%",
                                }}
                              >
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--work"
                                  contentStyle={{
                                    background: "rgb(33, 150, 243)",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid  rgb(33, 150, 243)",
                                  }}
                                  iconStyle={{
                                    background: "rgb(33, 150, 243)",
                                    color: "#fff",
                                  }}
                                >
                                  <img
                                    alt={item.gameName}
                                    style={{
                                      maxWidth: "60%",
                                      marginBottom: 15,
                                    }}
                                    src={
                                      require("assets/images/games/" +
                                        item.gameName +
                                        ".jpg").default
                                    }
                                  ></img>
                                  <h3 className="vertical-timeline-element-title">
                                    Registration Open
                                  </h3>
                                  

                                  <small
                                    style={{
                                      marginBottom: 15,
                                      display: "block",
                                      fontSize: 13,
                                    }}
                                  >
                                    Score Update: Every 60 minutes
                                    <br />
                                    Total Score: Top 10 games
                                    <br />
                                    Regions: All Regions
                                    <br />
                                    Servers: All Servers
                                    
                                  </small>
                                  <h3 className="vertical-timeline-element-title">
                                      <Countdown
                                          renderer={renderer}
                                          date={dateStart}
                                        />
                                        
                                      </h3>
                                        
                                   {!isJoin && item.totalPlayer > item.players.length && (
                                    <h4 className="vertical-timeline-element-subtitle"  style={{paddingBottom:0}}>
                                    <Button
                                      className="btn-roun2d"
                                      onClick={this.handleJoinMatch}
                                      variant="danger"
                                      disabled={this.state.isloading}
                                    >
                                      <b>Join League</b><br/> {item.inSign.replace('Dollar','$')} <CurrencyFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                    </Button>
                                    </h4>
                                  )}
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--education my-list"
                                  contentStyle={{
                                    background: "rgb(233, 30, 99)",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid  rgb(233, 30, 99)",
                                  }}
                                  iconStyle={{
                                    background: "rgb(233, 30, 99)",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Results Tracking
                                  </h3>
                                  <h4 className="vertical-timeline-element-subtitle">
                                    <Countdown
                                      renderer={renderer}
                                      date={dateExpired}
                                    />
                                  </h4>

                                  <ListGroup>
                                    <ListGroup.Item>
                                      Kills{" "}
                                      <Badge variant="primary">
                                        x 20 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Damage Done
                                      <Badge variant="primary">
                                        x 0.06 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Time Played
                                      <Badge variant="primary">
                                        x 0.04 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      1st Place
                                      <Badge variant="primary">
                                        + 240 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      2nd or 3rd Place
                                      <Badge variant="primary">
                                        + 60 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      4th to 8th Place +{" "}
                                      <Badge variant="primary">
                                        + 20 Points
                                      </Badge>
                                    </ListGroup.Item>
                                  </ListGroup>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--education"
                                  contentStyle={{
                                    background: "#7209b7",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #7209b7",
                                  }}
                                  iconStyle={{
                                    background: "#7209b7",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Watch Live
                                  </h3>
                                  <p>
                                    <FontAwesomeIcon
                                      icon={faTwitch}
                                      style={{ color: "#fff", fontSize: 40 }}
                                    />
                                  </p>
                                  <h5>Nobody is currently live</h5>
                                  <p>
                                    By connecting your Twitch account you will
                                    automatically be shown on the Watch Live
                                    pages of the tournaments you are playing in
                                  </p>
                                  <br />
                                  <Button
                                    className="btn-round"
                                    onClick={this.handleHowStream}
                                    variant="warning"
                                  >
                                    How to Stream
                                  </Button>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--education  my-list"
                                  contentStyle={{
                                    background: "#2a9d8f",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #2a9d8f",
                                  }}
                                  iconStyle={{
                                    background: "#2a9d8f",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Prizes
                                    <div style={{position:'relative',zIndex:1,margin:20}}>
                                    {getGroupBadgePrice(item.outSign, item.prize , "")}
                                    </div>
                                  </h3>
                                  <h4 className="vertical-timeline-element-subtitle">
                                    <Countdown
                                      renderer={renderer}
                                      date={dateExpired}
                                    />
                                  </h4>
                                  <div
                                    style={{ maxHeight: 230, overflow: "auto" }}
                                  >
                                    <ListGroup>
                                      {item.current_brackets.map(
                                        (win, i) => {
                                          icStart = icStart + 1;
                                          icEnd = icEnd + parseInt(win.number);
                                          var icShow = "#" + icStart;
                                          if (icStart != icEnd) {
                                            icShow = icShow + " - #" + icEnd;
                                            icStart = icEnd;
                                          }
                                          if (icStart <= 2005) {
                                            return (
                                              <ListGroup.Item>
                                                <span style={{ fontSize: 17 }}>
                                                  {" "}
                                                  {icShow} <small> - %{win.percent}</small>
                                                </span>
                                                {getGroupBadgeList(item.inSign,item.prize*win.percent/100,'badgegroup')}
                                                
                                               
                                              </ListGroup.Item>
                                            );
                                          }
                                        }
                                      )}
                                    </ListGroup>
                                  </div>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--education"
                                  contentStyle={{
                                    background: "#e76f51",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #e76f51",
                                  }}
                                  iconStyle={{
                                    background: "#e76f51",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Finished &amp; Paid
                                  </h3>
                                  <h4 className="vertical-timeline-element-subtitle">
                                    <Countdown
                                      renderer={renderer}
                                      date={item.finished}
                                    />
                                  </h4>
                                  <div
                                    style={{ maxHeight: 580, overflow: "auto" }}
                                  >
                                    <Table striped  variant="dark">
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                          <th>Username</th>
                                          <th>Average Score</th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {item.players.map((player, i) => {
                                          icStartL = icStartL + 1;
                                          if (icStartL <= 225) {
                                            return (
                                              <>
                                                <tr>
                                                  <td>#{icStartL}</td>
                                                  <td
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    <Avatar
                                                      size="25"
                                                      round={true}
                                                      title={player.username}
                                                      name={setAvatar(
                                                        player.username
                                                      )}
                                                    />{" "}
                                                    {player.username} ---
                                                    
                                                    {player.nickName}
                                                    {player.social && (
                                                      <ListGroup
                                                        horizontal
                                                        style={{
                                                          display:
                                                            "inline-flex",
                                                          marginTop: 0,
                                                          lineHeight: "20px",
                                                          float: "right",
                                                        }}
                                                      >
                                                        {player.social
                                                          .instagram && (
                                                          <ListGroup.Item
                                                            action
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faInstagram}
                                                              style={{
                                                                color:
                                                                  "#e95950",
                                                              }}
                                                            />
                                                          </ListGroup.Item>
                                                        )}

                                                        <ListGroup.Item action>
                                                          <FontAwesomeIcon
                                                            icon={faTwitch}
                                                            style={{
                                                              color: "#fff",
                                                            }}
                                                          />
                                                        </ListGroup.Item>
                                                        <ListGroup.Item action>
                                                          <FontAwesomeIcon
                                                            icon={faYoutube}
                                                            style={{
                                                              color: "#FF0000",
                                                            }}
                                                          />
                                                        </ListGroup.Item>
                                                        <ListGroup.Item action>
                                                          <FontAwesomeIcon
                                                            icon={faTwitter}
                                                            style={{
                                                              color: "#00acee",
                                                            }}
                                                          />
                                                        </ListGroup.Item>
                                                      </ListGroup>
                                                    )}
                                                  </td>
                                                  <td>{item.score} 1000</td>
                                                  <td>
                                                    <Button
                                                      variant="dark"
                                                      className="btn-block"
                                                      onClick={ () => this.showDetails(player.username) }
                                                      
                                                    >
                                                      View
                                                    </Button>
                                                  </td>
                                                </tr>
                                                <tr className={"hide gdetails no"+player.username}>
                                                 
                                                  <td colSpan={4} style={{
                                                              display: "table-cell",
                                                              background:"#eee"
                                                            }}>
                                                    <Table
                                                      striped size="sm"
                                                      
                                                    >
                                                      <thead>
                                                        <tr>
                                                          <th>Date</th>
                                                          <th>Score</th>
                                                          <th>Kills</th>
                                                          <th>Damage Done</th>
                                                          <th>Time Played</th>
                                                          <th>Rank</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {player.callOfDuties.map(
                                                          (callOfDuties, i) => {
                                                            return (
                                                              <tr>
                                                                <td>
                                                                  {
                                                                    callOfDuties.utcStartTime
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.score
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.kills
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.damageDone
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.timePlayed
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.ranking
                                                                  }
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </Table>
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          }
                                        })}
                                      </tbody>
                                    </Table>
                                  </div>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--education"
                                  contentStyle={{
                                    background: "#264653",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #264653",
                                  }}
                                  iconStyle={{
                                    background: "#264653",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    League Rules
                                  </h3>
                                  <p id="jsonhtml"></p>
                                  <span id="jsonhtml2" className="hide">
                                    {item.rules}
                                  </span>
                                </VerticalTimelineElement>
                              </VerticalTimeline>
                            </Col>
                          </Row>
                        </Card.Header>
                      </Card>
                    </Col>
                  ) : (
                    <>
                      {(item.gameMode == "Tournament" && !this.state.matchid) ? (
                        <Col className="mx-auto" lg="10" md="11">
                          <Card
                            className="card-lock text-center card-plain card-league"
                            style={{ color: "#fff" }}
                          >
                            <Card.Header>
                              <Row>
                                <Col
                                  xs="12"
                                  style={{
                                    lineHeight: "20px",
                                    color: "#fff",
                                    fontSize: "20px",
                                  }}
                                >
                                  {getGroupBadge(item.inSign, item.amount, "")}
                                  <h5 style={{ marginTop: 5 }}>
                                    {item.gameName} <br />
                                    <small>{item.gameMode}</small> <br />
                                    <small className="text-muted">
                                      <FontAwesomeIcon
                                        fixedWidth
                                        icon={getIcon(item.gameConsole)}
                                      />{" "}
                                      {item.gameConsole}
                                    </small>
                                  </h5>
                                  {getGroupBadgePrice(item.outSign, item.prize , "")}
                                  <small>
                                    {item.players.map((user, z) => (
                                      <span key={z}>
                                        {currentUser.username ==
                                          user.username && (isJoin = true)}
                                        {z < 5 ? (
                                          <>
                                            {z < 4 ? (
                                              <Avatar
                                                size="25"
                                                title={user.username}
                                                round={true}
                                                name={setAvatar(user.username)}
                                              />
                                            ) : (
                                              <Avatar
                                                size="25"
                                                round={true}
                                                value={
                                                  "+" +
                                                  (item.players.length - 4)
                                                }
                                                color="gray"
                                              />
                                            )}
                                          </>
                                        ) : null}

                                      </span>
                                    ))}
                                  </small>
                                  {item.status == 'Pending' ? (
                                    <>
                                  <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 20,
                                        }}
                                      >
                                        {item.players.length}/{item.totalPlayer}
                                      </small>
                                      <ProgressBar
                                        animated
                                        variant="danger"
                                        now={
                                          (item.players.length /
                                            item.totalPlayer) *
                                          100
                                        }
                                        style={{
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          maxWidth: "50%",
                                        }}
                                      />
                                      </>
                                  ):(
                                    <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 20,
                                        }}
                                      >
                                        {item.status}
                                        {matchLevelFind && (
                                          <>
                                          <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 30,
                                        }}
                                      >
{getMatchTitle(matchLevelFind.level,item.totalPlayer)}
</small>
</>
                                        )}
                                        
                                      </small>
                                    
                                  )}
                                  <VerticalTimeline
                                    layout="1-column-left"
                                    className="hide2"
                                    style={{
                                      marginLeft: "-30px",
                                      marginRight: "-30px",
                                      width: "110%",
                                    }}
                                  >
                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--work"
                                      contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight:
                                          "7px solid  rgb(33, 150, 243)",
                                      }}
                                      iconStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                      }}
                                    >
                                      <img
                                        alt={item.gameName}
                                        style={{
                                          maxWidth: "60%",
                                          marginBottom: 15,
                                        }}
                                        src={
                                          require("assets/images/games/" +
                                            item.gameName +
                                            ".jpg").default
                                        }
                                      ></img>
                                      
                                      
                                      {!isJoin && item.totalPlayer > item.players.length ? (
                                        <>
                                        <h3 className="vertical-timeline-element-title">
                                      <Countdown
                                          renderer={renderer}
                                          date={dateExpired}
                                        />
                                        
                                      </h3>
                                        <h4 className="vertical-timeline-element-subtitle"  style={{paddingBottom:0}}>
                                        <Button
                                          className="btn-roun2d"
                                          onClick={this.handleJoinMatch}
                                          variant="danger"
                                          disabled={this.state.isloading}
                                        >
                                          <b>Join Tournament</b><br/> {item.inSign.replace('Dollar','$')} <CurrencyFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                        </Button>
                                        </h4>
                                        </>
                                      ):(
                                        <>
                                        {mymatchFind && (
                                          <>
                                          <h3 className="vertical-timeline-element-title">
                                      <Countdown
                                          renderer={renderer}
                                          date={mymatchFind.startTime}
                                        />
                                        
                                      </h3>
                                          <h4 className="vertical-timeline-element-subtitle"  style={{paddingBottom:0}}>
                                            <Link to={'/panel/matchlobby?id='+item.id+'&matchid='+mymatchFind.id}>
                                          <Button
                                            className="btn-roun2d"
                                            
                                            variant="warning"
                                            
                                          >
                                            <b>Open My Match</b>
                                          </Button>
                                          </Link>
                                          </h4>
                                          </>
                                        )}
                                        </>
                                      )}
                                      

                                      
                                      
                                    </VerticalTimelineElement>

                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--education"
                                      contentStyle={{
                                        background: "#7209b7",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight: "7px solid #7209b7",
                                      }}
                                      iconStyle={{
                                        background: "#7209b7",
                                        color: "#fff",
                                      }}
                                    >
                                      <h3 className="vertical-timeline-element-title">
                                        Watch Live
                                      </h3>
                                      <p>
                                        <FontAwesomeIcon
                                          icon={faTwitch}
                                          style={{
                                            color: "#fff",
                                            fontSize: 40,
                                          }}
                                        />
                                      </p>
                                      <h5>Nobody is currently live</h5>
                                      <p>
                                        By connecting your Twitch account you
                                        will automatically be shown on the Watch
                                        Live pages of the tournaments you are
                                        playing in
                                      </p>
                                      <br />
                                      <Button
                                        className="btn-round"
                                        onClick={this.handleHowStream}
                                        variant="warning"
                                        disabled={this.state.isloading}
                                      >
                                        How to Stream
                                      </Button>
                                    </VerticalTimelineElement>
                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--education  my-list"
                                      contentStyle={{
                                        background: "#222",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight: "7px solid #222",
                                      }}
                                      iconStyle={{
                                        background: "#222",
                                        color: "#fff",
                                      }}
                                    >
                                      <h3 className="vertical-timeline-element-title">
                                        Matches
                                      </h3>
                                      <Accordion >
                                        {item.matchLevel.map((match, i) => {
                                          //console.log(match)
                                          
                                          
                                          //lists.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
                                            var hatchbackCar = lists.filter( (list) => list.level === item.matchLevel[i].level);
                                            hatchbackCar.sort((a, b) => (a.id > b.id ? 1 : -1));
                                            
                                          //console.log(hatchbackCar)
                                          return (
                                           
                                            <Card
                                              className="card-lock text-center card-plain"
                                              style={{ color: "#fff" }}
                                              key={i}
                                            >
                                              <Card.Header>
                                                
                                                <Accordion.Toggle
                                                  as={Button}
                                                  variant="link"
                                                  eventkey={i}
                                                >
                                                  <Card.Title
                                                    as="h3"
                                                    style={{ color: "#fff" }}
                                                  >
                                                    {getMatchTitle(hatchbackCar[0].level,item.totalPlayer)}
                                                  </Card.Title>
                                                  <Countdown
                                                    renderer={renderer}
                                                    date={hatchbackCar[0].startTime}
                                                  />
                                                </Accordion.Toggle>
                                              </Card.Header>
                                              <Accordion.Collapse
                                                eventkey={i}
                                                className="show"
                                              >
                                                <Card.Body
                                                  style={{
                                                    background: "rgba(0,0,0,.9",
                                                    padding: 0,
                                                    fontSize: 13,
                                                  }}
                                                >
                                                  {
                                                  
                                                  hatchbackCar.map(
                                                    (mtch, z) => {
                                                      var avSize = 30;
                                                      var avT = getMatchTitle(hatchbackCar[0].level,item.totalPlayer);
                                                      if (avT == 'SemiFinal') {
                                                        avSize = 40;
                                                      }
                                                      if (avT == 'Final') {
                                                        avSize = 60;
                                                      }
                                                      if (avT == '3rd Place') {
                                                        avSize = 50;
                                                      }
                                                      return (
                                                        <>
                                                         <Link key={z} to={'/panel/matchlobby?id='+item.id+'&matchid='+mtch.id}>
                                                          <Row
                                                          
                                                            
                                                            style={{
                                                              borderBottom:
                                                                "1px rgba(255,255,255,.2) solid",
                                                              paddingBottom: 10,
                                                              paddingTop: 15,
                                                            }}
                                                          >
                                                            {mtch.matchPlayers.map(
                                                              (player, j) => {
                                                                var pName  = player.username;
                                                              
                                                                return (
                                                                  <>
                                                                    <Col
                                                                      xs="4"
                                                                      key={j}
                                                                      style={
                                                                        !pName
                                                                          ? {
                                                                              opacity: 0.3,
                                                                            }
                                                                          : null
                                                                      }
                                                                    >
                                                                      <div>
                                                                        {pName ? (
                                                                          <Avatar
                                                                            size={
                                                                              avSize
                                                                            }
                                                                            round={
                                                                              true
                                                                            }
                                                                            title={
                                                                              pName
                                                                            }
                                                                            name={setAvatar(
                                                                              pName
                                                                            )}
                                                                          />
                                                                        ) : (
                                                                          <Avatar
                                                                            size={
                                                                              avSize
                                                                            }
                                                                            round={
                                                                              true
                                                                            }
                                                                            src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                                                            color="lightgray"
                                                                          />
                                                                        )}
                                                                      </div>
                                                                      {!pName && (
                                                                        <>...</>
                                                                      )}
                                                                      <small>
                                                                        {" "}
                                                                        {
                                                                          pName
                                                                        }
                                                                      </small>
                                                                    </Col>
                                                                    {j == 0 && (
                                                                      <Col
                                                                        xs="4"
                                                                        key={j+item.totalPlayer/2}
                                                                      >
                                                                        {mtch.winner ? (
                                                                          <>
                                                                            <div
                                                                              className=" winner avatar"
                                                                              style={{
                                                                                width:
                                                                                  avSize,
                                                                                height:
                                                                                  avSize,
                                                                                zIndex: 0,
                                                                                backgroundColor:
                                                                                  "transparent",
                                                                              }}
                                                                            ></div>
                                                                            <div className=" ">
                                                                              <Avatar
                                                                                size={
                                                                                  avSize
                                                                                }
                                                                                round={
                                                                                  true
                                                                                }
                                                                                title={
                                                                                  mtch.winner
                                                                                }
                                                                                name={setAvatar(
                                                                                  mtch.winner
                                                                                )}
                                                                              />
                                                                            </div>
                                                                            <div>
                                                                              {
                                                                                mtch.winner
                                                                              }{" "}
                                                                              is
                                                                              winner
                                                                            </div>
                                                                          </>
                                                                        ):(
                                                                          <>
                                                                            
                                                                            
                                                                            <div style={{lineHeight:avSize +'px'}}>
                                                                              {
                                                                                mtch.status}
                                                                              
                                                                            </div>
                                                                          </>
                                                                        )}
                                                                      </Col>
                                                                    )}
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                          </Row>
                                                          </Link>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </Card.Body>
                                              </Accordion.Collapse>
                                            </Card>
                                          );
                                        })}
                                      </Accordion>
                                    </VerticalTimelineElement>

                                    
                                    <VerticalTimelineElement
                                  className="vertical-timeline-element--education  my-list"
                                  contentStyle={{
                                    background: "#2a9d8f",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #2a9d8f",
                                  }}
                                  iconStyle={{
                                    background: "#2a9d8f",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Prizes
                                    <div style={{position:'relative',zIndex:1,margin:20}}>
                                    {getGroupBadgePrice(item.outSign, item.prize , "")}
                                    </div>
                                  </h3>
                                  
                                  <div
                                    style={{ maxHeight: 230, overflow: "auto" }}
                                  >
                                    <ListGroup>
                                      {item.current_brackets.map(
                                        (win, i) => {
                                          icStart = icStart + 1;
                                          icEnd = icEnd + parseInt(win.number);
                                          var icShow = "#" + icStart;
                                          if (icStart != icEnd) {
                                            icShow = icShow + " - #" + icEnd;
                                            icStart = icEnd;
                                          }
                                          if (icStart <= 2005) {
                                            return (
                                              <ListGroup.Item>
                                                <span style={{ fontSize: 17 }}>
                                                  {" "}
                                                  {icShow} <small> - %{win.percent}</small>
                                                </span>
                                                {getGroupBadgeList(item.inSign,win.prize,'badgegroup')}
                                                
                                               
                                              </ListGroup.Item>
                                            );
                                          }
                                        }
                                      )}
                                    </ListGroup>
                                  </div>
                                </VerticalTimelineElement>
                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--education"
                                      contentStyle={{
                                        background: "#264653",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight: "7px solid #264653",
                                      }}
                                      iconStyle={{
                                        background: "#264653",
                                        color: "#fff",
                                      }}
                                    >
                                      <h3 className="vertical-timeline-element-title">
                                        Tournament Rules
                                      </h3>
                                      <p id="jsonhtml"></p>
                                      <span id="jsonhtml2" className="hide">
                                        {" "}
                                        {item.rules}
                                      </span>
                                    </VerticalTimelineElement>
                                  </VerticalTimeline>
                                </Col>
                              </Row>
                            </Card.Header>
                            <Card.Body></Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        <Col className="mx-auto" lg="7" md="10">
                          <Card
                            className="card-lock text-center card-plain card-match"
                            style={{ color: "#fff" }}
                          >
                            <Card.Header>
                              <Row>
                                {
                                
                                matchidFind.matchPlayers.map(
                                  (player, j) => {
                                    if (player.username) {
                                      activePlayer++;
                                    }
                                    if (
                                      player.username == currentUser.username &&
                                      player.ready &&
                                      !this.state.curPlayerReady &&
                                      firstLoad
                                    ) {
                                      this.setState({ curPlayerReady: true });
                                    }
                                    return (
                                      <>
                                        {j == 1 && (
                                          <Col
                                            xs="4"
                                            style={{
                                              lineHeight: "20px",
                                              color: "#fff",
                                              fontSize: "20px",
                                            }}
                                          >
                                            {getGroupBadge(
                                              item.outSign,
                                              item.amount,
                                              ""
                                            )}
                                            <h5 style={{ marginTop: 5 }}>
                                              {item.gameName} <br />
                                              <small>
                                                {item.gameMode}
                                              </small>{" "}
                                              <br />
                                              <small className="text-muted">
                                                <FontAwesomeIcon
                                                  fixedWidth
                                                  icon={getIcon(
                                                    item.gameConsole
                                                  )}
                                                />{" "}
                                                {item.gameConsole}
                                              </small>
                                            </h5>
                                           
                              {getGroupBadgePrice(item.outSign, item.prize , "")}
                             
                                          </Col>
                                        )}
                                        {(j == 3 || j == 5) && (
                                          <Col
                                            xs="4"
                                            style={{
                                              lineHeight: "20px",
                                              color: "#fff",
                                              fontSize: "20px",
                                            }}
                                          >
                                            <Badge
                                              variant={getColor(item.amount)}
                                            >
                                              ${item.amount}
                                            </Badge>
                                            <h4 style={{ marginTop: 5 }}>
                                              {item.game} <br />
                                              <small className="text-muted">
                                                <FontAwesomeIcon
                                                  fixedWidth
                                                  icon={getIcon(
                                                    item.gameconsole
                                                  )}
                                                />{" "}
                                                {item.gameconsole}
                                              </small>
                                            </h4>
                                            
                                          </Col>
                                        )}
                                        <Col
                                          xs="4"
                                          key={j}
                                          style={
                                            !player.username
                                              ? { opacity: 0.3 }
                                              : null
                                          }
                                        >
                                          <div>
                                            {player.username ? (
                                              <a href={"/user/"+player.username}  target="_blank">
                                              <Avatar
                                                size="50"
                                                round={true}
                                                title={player.username}
                                                name={setAvatar(
                                                  player.username
                                                )}
                                              />
                                              </a>
                                            ) : (
                                              <Avatar
                                                size="50"
                                                round={true}
                                                src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                                color="lightgray"
                                              />
                                            )}
                                          </div>
                                          {!player.username && <>...</>}
                                          <small> {player.username}</small>
                                          {(!this.state.matchid) && (
                                            <>
                                          {(matchidFind.status == "Pending" ||
                                            matchidFind.status == "Ready") && (
                                            <>
                                              <br />
                                              {(matchidFind.status != "Ready" ||
                                                player.username !=
                                                  currentUser.username) && (
                                                <div
                                                  style={{
                                                    position: "absolute",
                                                    width: "100%",
                                                    height: 30,
                                                    zIndex: 3,
                                                  }}
                                                ></div>
                                              )}

                                              <div
                                                style={
                                                  matchidFind.status != "Ready" ||
                                                  player.username !=
                                                    currentUser.username
                                                    ? { opacity: 0.5 }
                                                    : null
                                                }
                                              >
                                                <BootstrapSwitchButton
                                                  checked={player.ready}
                                                  size="xs"
                                                  onlabel="Ready"
                                                  onstyle="success"
                                                  offlabel="Ready"
                                                  onChange={(
                                                    checked: boolean
                                                  ) => {
                                                    this.handlechangeReadyEvent(
                                                      checked
                                                    );
                                                  }}
                                                  style="w-100 mx-1"
                                                />
                                              </div>
                                            </>
                                          )}
                                          </>
                                          )}
                                          {(player.username && matchidFind.status=='InPlay') && (
                                            <>
                                          {(isInPlayers) && (
                                            <>
                                          <div>---------</div>

                                          <p><small className="text-muted">{getPlayerTag(player.username,item.players,'console',item.gameName)} ID</small><br/>{getPlayerTag(player.username,item.players,'tagid',item.gameName)}</p>
                                          {(getPlayerTag(player.username,item.players,'nickname',item.gameName).length > 3) &&(
                                            <p><small className="text-muted">Nickname</small><br/>{getPlayerTag(player.username,item.players,'nickname',item.gameName)}</p>
                                          )}
                                          
                                          </>
                                          )}
                                          </>
                                          )}
                                        </Col>
                                      </>
                                    );
                                  }
                                )}
                              </Row>
                            </Card.Header>
                            {(item.gameMode == "Tournament" && this.state.matchid) ? (
                              
                              <>
                            <Card.Body>
                              <Row>
                                <Col xs="12">
                                <h2>{getMatchTitle(matchidFind.level,item.totalPlayer)}</h2>
                                {(matchidFind.status == 'Pending') && (
                                    <>
                                  
                                  <h3>
                                  
                                  <small className="text-muted">Start at</small><br/>
                                              <Countdown
                                                  renderer={renderer}
                                                  date={matchidFind.startTime}
                                                />
                                                
                                              </h3>
                                              </>
                                )}
                                
                                  {item.gameName == "ClashRoyale" &&
                                  matchidFind.status == "InPlay" ? (
                                    <>
                                      <Button
                                        className="btn-fill btn-block btn-lg"
                                        type="button"
                                        variant="danger"
                                        style={{
                                          position: "relative",
                                          zIndex: 1,
                                        }}
                                        onClick={this.handleClashFinished}
                                        disabled={this.state.isloading}
                                      >
                                        Game finished
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {(isInPlayers) && (
                                        <>
                                          {matchidFind.status == "InPlay" && (
                                            <>
                                              <p>Match Code</p>

                                              <Card.Title
                                                as="h1"
                                                className="matchcode"
                                              >
                                                {getCode(matchidFind.matchCode)}
                                              </Card.Title>
                                              <Row>
                                                <Col xs="6">
                                                  <Button
                                                    className="btn-fill btn-block btn-lg"
                                                    type="button"
                                                    variant="danger"
                                                    style={{
                                                      position: "relative",
                                                      zIndex: 1,
                                                    }}
                                                    onClick={
                                                      this.handlecAlertLost
                                                    }
                                                  >
                                                    I Lost
                                                  </Button>
                                                </Col>

                                                <Col xs="6">
                                                  <input
                                                    type="file"
                                                    id="uploadfile"
                                                    accept="video/*"
                                                    name="file"
                                                    className="hide"
                                                    ref={this.fileUpload}
                                                    onChange={
                                                      this.onChangeHandler
                                                    }
                                                  />
                                                  <Button
                                                    className="btn-fill btn-block btn-lg"
                                                    type="button"
                                                    variant="success"
                                                    style={{
                                                      position: "relative",
                                                      zIndex: 1,
                                                    }}
                                                    onClick={
                                                      this.handlecAlertWin
                                                    }
                                                    disabled={isUpLoading}
                                                  >
                                                    {progressLable}
                                                  </Button>
                                                  {progress > 0 && (
                                                    <div className="prosbar">
                                                      <ProgressBar
                                                        variant="success"
                                                        now={progress}
                                                        label={""}
                                                      />
                                                    </div>
                                                  )}
                                                </Col>
                                              </Row>
                                            </>
                                          )}
                                          
                                          
                                              
                                          
                                        </>
                                      )}
                                    </>
                                  )}

                                 
                                      {matchidFind.winner && (
                                        <>
                                        <div
                                            
                                            style={{ position:'relative',top:20}}
                                          >
                                          <div
                                            className=" winner avatar"
                                            style={{ width: 92, height: 92}}
                                          ></div>
                                          <div className=" ">
                                            <Avatar
                                              size="92"
                                              round={true}
                                              title={matchidFind.winner}
                                              name={setAvatar(
                                                matchidFind.winner
                                              )}
                                            />
                                          </div>
                                          </div>
                                          <h3 style={{color:'gold'}}>
                                            {matchidFind.winner}<br/><small className="text-muted" style={{position:'relative',top:-5}}>is
                                            winner</small>
                                          </h3>
                                        </>
                                      )}
                                </Col>
                                
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <Card
                                style={{
                                  backgroundColor: "black",
                                  overflow: "auto",
                                  margin: "0 auto",
                                  maxWidth: 300,
                                }}
                              >
                                <Card.Body
                                  style={{
                                    lineHeight: "10px",
                                    overflow: "auto",
                                    textAlign: "initial",
                                  }}
                                >
                                  <img
                                    alt={item.gameName}
                                    style={{ width: "100%" }}
                                    src={
                                      require("assets/images/games/" +
                                        item.gameName +
                                        ".jpg").default
                                    }
                                  ></img>
                                  <Table
                                    striped
                                    hover
                                    borderless={true}
                                    variant="dark"
                                  >
                                    <tbody>
                                      
                                    <tr>
                                        <td>Mode</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.gameMode}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Event ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.id}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Event Status</td>

                                        <td style={{ textAlign: "right" }}>
                                          {item.status}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Match ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {matchidFind.id}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Match Status</td>

                                        <td style={{ textAlign: "right" }}>
                                          {matchidFind.status}
                                        </td>
                                      </tr>
                                      <tr style={{ background: "black" }}>
                                        <td>Prizes</td>

                                        <td style={{ textAlign: "right" }}>
                                          {item.outSign.replace('Dollar','$')} <CurrencyFormat value={item.prize} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                        </td>
                                      </tr>
                                      {item.current_brackets.map(
                                        (win, w) => {
                                          icStart = icStart + 1;
                                          icEnd = icEnd + parseInt(win.number);
                                          var icShow = "#" + icStart;
                                          var nAmount = Number.parseFloat(win.prize).toFixed(2);
                                            return (
                                              <tr>
                                              <td>{icShow}</td>
                                              <td style={{ textAlign: "right" }}>{item.outSign.replace('Dollar','$')} <CurrencyFormat value={nAmount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} /></td>
                                                </tr>
                                            );
                                          
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                              
                            </Card.Footer>
                            </>):(
                              <>
                              <Card.Body>
                              <Row>
                                <Col xs="12">
                                  <h2>{matchidFind.status}</h2>
                                  {item.gameName == "ClashRoyale" &&
                                  matchidFind.status == "InPlay" ? (
                                    <>
                                      <Button
                                        className="btn-fill btn-block btn-lg"
                                        type="button"
                                        variant="danger"
                                        style={{
                                          position: "relative",
                                          zIndex: 1,
                                        }}
                                        onClick={this.handleClashFinished}
                                        disabled={this.state.isloading}
                                      >
                                        Game finished
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {(item.players[0].username ==
                                        currentUser.username ||
                                        item.players[1].username ==
                                          currentUser.username) && (
                                        <>
                                          {matchidFind.status == "InPlay" && (
                                            <>
                                              <p>Match Code</p>

                                              <Card.Title
                                                as="h1"
                                                className="matchcode"
                                              >
                                                {getCode(matchidFind.matchCode)}
                                              </Card.Title>
                                              <Row>
                                                <Col xs="6">
                                                  <Button
                                                    className="btn-fill btn-block btn-lg"
                                                    type="button"
                                                    variant="danger"
                                                    style={{
                                                      position: "relative",
                                                      zIndex: 1,
                                                    }}
                                                    onClick={
                                                      this.handlecAlertLost
                                                    }
                                                  >
                                                    I Lost
                                                  </Button>
                                                </Col>

                                                <Col xs="6">
                                                  <input
                                                    type="file"
                                                    id="uploadfile"
                                                    accept="video/*"
                                                    name="file"
                                                    className="hide"
                                                    ref={this.fileUpload}
                                                    onChange={
                                                      this.onChangeHandler
                                                    }
                                                  />
                                                  <Button
                                                    className="btn-fill btn-block btn-lg"
                                                    type="button"
                                                    variant="success"
                                                    style={{
                                                      position: "relative",
                                                      zIndex: 1,
                                                    }}
                                                    onClick={
                                                      this.handlecAlertWin
                                                    }
                                                    disabled={isUpLoading}
                                                  >
                                                    {progressLable}
                                                  </Button>
                                                  {progress > 0 && (
                                                    <div className="prosbar">
                                                      <ProgressBar
                                                        variant="success"
                                                        now={progress}
                                                        label={""}
                                                      />
                                                    </div>
                                                  )}
                                                </Col>
                                              </Row>
                                            </>
                                          )}
                                          {matchidFind.status == "InPlay" && (
                                            <>
                                              <p>
                                                <small className="text-muted">
                                                  Avalable until
                                                </small>
                                                <br />
                                                <Countdown
                                                  renderer={renderer}
                                                  date={dateExpired}
                                                />
                                              </p>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}

                                  {matchidFind.status !== "" ? (
                                    <>
                                      {matchidFind.winner ? (
                                        <>
                                          <div
                                            
                                            style={{ position:'relative',top:20}}
                                          >
                                          <div
                                            className=" winner avatar"
                                            style={{ width: 92, height: 92}}
                                          ></div>
                                          <div className=" ">
                                            <Avatar
                                              size="92"
                                              round={true}
                                              title={matchidFind.winner}
                                              name={setAvatar(
                                                matchidFind.winner
                                              )}
                                            />
                                          </div>
                                          </div>
                                          <h3 style={{color:'gold'}}>
                                            {matchidFind.winner}<br/><small className="text-muted" style={{position:'relative',top:-5}}>is
                                            winner</small>
                                          </h3>
                                        </>
                                      ) : (
                                        <>
                                          {(matchidFind.status == "Pending" ||
                                            matchidFind.status == "Ready") && (
                                            <>
                                              {item.players[0].username ==
                                                currentUser.username ||
                                              item.players[1].username ==
                                                currentUser.username ? (
                                                <>
                                                  <p>
                                                    <small className="text-muted">
                                                      Avalable until
                                                    </small>
                                                    <br />
                                                    <Countdown
                                                      renderer={renderer}
                                                      date={dateExpired}
                                                    />
                                                  </p>
                                                  {item.players[0].username &&
                                                  item.players[1].username &&
                                                  matchidFind.status == "Ready" ? (
                                                    <>
                                                      <p
                                                        style={{
                                                          color: "#fff",
                                                          fontSize: "14px",
                                                          padding: 20,
                                                        }}
                                                      >
                                                        Waiting for ready...
                                                      </p>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <p
                                                        style={{
                                                          color: "#fff",
                                                          fontSize: "14px",
                                                          padding: 20,
                                                        }}
                                                      >
                                                        Waiting for another
                                                        player...
                                                      </p>
                                                    </>
                                                  )}

                                                  {matchidFind
                                                    .matchPlayers[0].username !=
                                                    currentUser.username && (
                                                    <Button
                                                      className="btn-round"
                                                      onClick={
                                                        this.handleLeaveMatch
                                                      }
                                                      variant="warning"
                                                      disabled={
                                                        this.state.isloading
                                                      }
                                                    >
                                                      Leave Match
                                                    </Button>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  <p>
                                                    <small className="text-muted">
                                                      Avalable until
                                                    </small>
                                                    <br />
                                                    <Countdown
                                                      renderer={renderer}
                                                      date={dateExpired}
                                                    />
                                                  </p>
                                                  <p
                                                    style={{
                                                      color: "#fff",
                                                      fontSize: "14px",
                                                      padding: 20,
                                                    }}
                                                  >
                                                    Match is open, join now
                                                    before someone else takes
                                                    your spot. Winner takes $
                                                    {item.prize}
                                                    , let's get it! Match open
                                                    for limited time.
                                                  </p>
                                                  {parseInt(item.totalPlayer) >
                                                    activePlayer && (
                                                    <Button
                                                      className="btn-round"
                                                      onClick={
                                                        this.handleJoinMatch
                                                      }
                                                      variant="danger"
                                                      disabled={
                                                        this.state.isloading
                                                      }
                                                    >
                                                      Join Match {item.inSign.replace('Dollar','$')}  {item.amount}
                                                    </Button>
                                                  )}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Col>
                                <Col className="text-center">
                                  {!item.players[1].username && <></>}
                                </Col>
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <Card
                                style={{
                                  backgroundColor: "black",
                                  overflow: "auto",
                                  margin: "0 auto",
                                  maxWidth: 300,
                                }}
                              >
                                <Card.Body
                                  style={{
                                    lineHeight: "10px",
                                    overflow: "auto",
                                    textAlign: "initial",
                                  }}
                                >
                                  <img
                                    alt={item.gameName}
                                    style={{ width: "100%" }}
                                    src={
                                      require("assets/images/games/" +
                                        item.gameName +
                                        ".jpg").default
                                    }
                                  ></img>
                                  <Table
                                    striped
                                    hover
                                    borderless={true}
                                    variant="dark"
                                  >
                                    <tbody>
                                    <tr>
                                        <td>Event ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.id}
                                        </td>
                                      </tr>
                                      
                                      <tr>
                                        <td>Match ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {matchidFind.id}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Match Status</td>

                                        <td style={{ textAlign: "right" }}>
                                          {matchidFind.status}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Winner takes</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.outSign.replace('Dollar','$')} <CurrencyFormat value={item.prize} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Mode</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.gameMode}
                                        </td>
                                      </tr>
                                      
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                              
                            </Card.Footer>
                              </>
                            )}
                          </Card>
                        </Col>
                      )}
                    </>
                  )}
                 
                </Container>
              </div>

              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/bg.jpg").default + ")",
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LockScreenPage;
