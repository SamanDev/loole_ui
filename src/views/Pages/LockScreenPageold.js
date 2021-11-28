import React, { Component } from "react";

import $ from "jquery";
import { NavLink, Link } from "react-router-dom";

// react-bootstrap components
import {
  Badge,
  Button,
  
  Container,
  
  Spinner,
  Accordion,
} from "react-bootstrap";

import Active  from "components/active.component";

import AdminNavbar from "components/Navbars/ChatNavbar.js";

import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";
import AuthService from "services/auth.service";
import League from "server/league";
import eventBus from "views/eventBus";

import LeagueSection  from "components/events/league.component"; 
import TournamentSection  from "components/events/tournament.component"; 
import MatchSection  from "components/events/match.component"; 
import MatchTourSection  from "components/events/tournamentmatch.component"; 
import {
  
  getQueryVariable,
 
  haveAdmin,
  editDateTime
} from "components/include";
import { UPLOADURL, POSTURLTest } from "const";
import Swal from "sweetalert2";

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
  var NstrDate = strDate.replace(" ","T")
  var datum = Date.parse(NstrDate);
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

var dateExpired = null;
var dateStart = null;
            
            var nullplayer = {
              id: 100000,
              
              username: false,
              ready: false,
            };
            var mymatchFind = null;
            var matchLevelFind =null
            var isJoin = false;
    var activePlayer = 0;
    var isLoading= false;
    var isEdit= false;
    var isEditTime = 0;
    
class LockScreenPage extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.reGetevents = this.reGetevents.bind(this);
    
    this.editEvent = this.editEvent.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.setMatchId = this.setMatchId.bind(this);
    this.setMatchIdFind = this.setMatchIdFind.bind(this);
   
    this.setUserTag = this.setUserTag.bind(this);
    this.state = {
      event: null,
      events: null,
      currentUserTag: AuthService.getCurrentUser(),
      tag: "R0P0C8R89",
      matchidFind: [],
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
      eventBus.on("eventsDataEventDo", (eventGet) => {
       
        alert()
        
        if (eventGet.id == this.state.eventid){
          isEdit= false;
          console.log(eventGet)
          this.editEvent(eventGet)
          
            
            
          
        }
        
        
        
       
      });
      eventBus.on("eventsDataEvent", (eventGet) => {
       // this.setEvent(null);
        
        this.setState({
          isloading: false,
        });
          this.reGetevents();
        
        
        
        
       
      });
     
    }
  }
  componentWillUnmount() {
    
  }
  
  setUserTag(e) {
    this.setState({
      currentUserTag: e
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
  setMatchIdFind(e) {
    this.setState({
      matchidFind: e,
    });

  }
  handleDelete(e) {
    e.preventDefault();

    userService.deleteEvent(this.state.eventid).then(
      (response) => {
        this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  
  
  reGetevents(){
    
    if(getQueryVariable("id") && this.state.isloading==false){
      console.log('isLoading:'+this.state.isloading);
      this.setState({
        isloading: true,
      });
      var eventGet = userService.getEventById(getQueryVariable("id"));
      console.log(eventGet)
      this.editEvent(eventGet)
     
      //isEdit= false;
     
    }
   
  }
  
  
  
  editEvent(item) {
    
    if(!item){
      
      isEdit= true;
    
      this.reGetevents()
    }else{
    
    clearTimeout(isEditTime)
    if(isEdit==false){
      isEdit= true;
      console.log('item:'+item)
     // isEdit= true;
    isJoin = false;
          
     activePlayer = 0;
      isInPlayers = false;
 var matchidFind = []
 var finalChat = []
 
 lists = [];

           
    activePlayer = 0;
  
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
          if((item.status=='InPlay' || item.status=='Pending' || item.status=='Ready') && item.gameMode=='Tournament'){
            lists.map((tblmatch, w) => {
              if(tblmatch.status=='InPlay' || tblmatch.status=='Pending' || tblmatch.status=='Ready'){
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
        
        item.expire = editDateTime(item.expire)
       item.startTime = editDateTime(item.startTime)
       item.finished = editDateTime(item.finished)
        var chats = item.chats;
        var eventchats = matchidFind.matchChats;
        if(item.chats!='null'){
          {item.chats.map((itemnew, i) => {
            finalChat.push(itemnew)
          })}
          {finalChat.map((itemnew, i) => {
            
              itemnew.time = editDateTime(itemnew.time)
             
            
           
            })}
            
            item.chats  = finalChat;
        }
        
        // this creates the intial state of this component based on the collapse routes
        // that it gets through routes prop
        

        finalChat = []
        if(matchidFind.matchChats!='null'){
          {matchidFind.matchChats.map((itemnew, i) => {
            finalChat.push(itemnew)
          })}
          {finalChat.map((itemnew, i) => {
           
              itemnew.time = editDateTime(itemnew.time)
              
            })}
            
            matchidFind.matchChats  = finalChat;
        }
        
       
       //item.expire = toTimestamp(item.expire)
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
        if(item.gameMode == "Tournament" && this.state.matchid) {
        if (!item.players[0]) {
          item.players.push(nullplayer);
        }
        if (!item.players[1]) {
          item.players.push(nullplayer);
        }
        }
        this.setMatchIdFind(matchidFind)
        //localStorage.setItem("eventsid", JSON.stringify(item));
        
          
          this.setEvent((item));
          
        
       
      }else{
        //isEdit= false;

        isEditTime = setTimeout(() => {
          console.log('isedit:'+isEdit)
          isEdit= false;
          //console.log(item);
          //this.editEvent(item);
        }, 2000);
      }
    }
  }
  render() {
    let { progress, isUpLoading, progressLable, event,events, eventid,currentUserTag, matchidFind } = this.state;
    //var item = event;
    
    //const { id } = useParams();
    //var { data: eventGet , isLoading } = useEvent(eventid)
   // var eventGet = false;
  
   if(!currentUserTag ){
   
    

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
         
    if ( event==null ) {
      //this.editEvent(event);
      this.editEvent(false);
      
      
      

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
            
    

                   // console.log(item)
                        
                    var currentUser = currentUserTag;
                    
   
    return (
      <>
        <div className="wrapper">
          {matchidFind && event.gameMode != "Tournament" ? (
            <Chatbar
              eventID={eventid}
              eventstatus={event.status}
              masterplayer={matchidFind.matchPlayers[0].username}
              secondplayer={matchidFind.matchPlayers[1].username}
              eventchats={event.chats}
              chats={matchidFind.matchChats}
              username={currentUser}
            />
          ) : (
            <>
            {this.state.matchid ? (
            <Chatbar
              eventID={eventid}
              matchID={this.state.matchid}
              eventstatus={event.status}
              masterplayer={matchidFind.matchPlayers[0].username}
              secondplayer={matchidFind.matchPlayers[1].username}
              eventchats={event.chats}
              chats={matchidFind.matchChats}
              username={currentUser}
            />
          ) : (
            <Chatbar
              eventID={eventid}
              eventstatus={event.status}
              masterplayer="null"
              secondplayer="null"
              eventchats={event.chats}
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
                              
                              <Link to={"/panel/lobby?id="+event.id} className="btn actbtn btn-danger btn-round "> Back </Link>
                            ):(
                              <>
                              {getQueryVariable("ref")? (
                              <>
                              {getQueryVariable("ref") == 'home'? (
                                <Link to={"/"+getQueryVariable("ref")} className="btn  actbtn btn-danger btn-round "> Back </Link>
                                ):(
                                  <Link to={"/panel/"+getQueryVariable("ref")} className="btn  actbtn btn-danger btn-round "> Back </Link>
                                  )}
                              </>
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
                             
                              
                                 
                                  
                               
                  {event.gameMode == "League" ? (
                    <LeagueSection item={event} token={currentUserTag} />
                  ) : (
                    <>
                      {(event.gameMode == "Tournament" && !this.state.matchid) ? (
                        <TournamentSection item={event} token={currentUserTag} />
                       
                      ) : (
                        <>
                        {(event.gameMode == "Tournament") ? (
                        <MatchTourSection item={event} matchidFind={matchidFind} token={currentUserTag} />
                        ) : (
                          
                          <MatchSection item={event} matchidFind={matchidFind} token={currentUserTag} />
                          
                        )}
                        </>
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
