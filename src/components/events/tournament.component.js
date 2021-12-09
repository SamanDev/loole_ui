import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import Avatar from "react-avatar";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
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
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Accordion
} from "semantic-ui-react";
import Moment from 'moment';
import CurrencyFormat from "react-currency-format";
import { IMaskInput } from "react-imask";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import eventBus from "views/eventBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import axios from "axios";
import {
    Badge,
    
    Card,
    Navbar,
    Nav,
    Container,
    Pagination,
    Col,
    Table,
    Row,
    
    ProgressBar,
    ListGroup,
    Spinner,
    
  } from "react-bootstrap";
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
    getGroupBadgesmall,
    rendererBig,
    printEventBTN,
    vsComponentTitle,
    getModalTag,
    getGameTag,
    getMatchTitle,
    getColorStatus,
    haveGameTag,
    getPlayerTag,
    isJson,
    haveAdmin,
    handleTagForm,
    vsComponentPlayer
  } from "components/include";
  import { UPLOADURL, POSTURLTest } from "const";
  
  
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

  var isInPlayers = false;
  var matchidFind = []
  var lists = [];
  var item = false;
  var expiryDate = new Date();
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
             
     
class TournamentSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
   
    this.handleHowStream = this.handleHowStream.bind(this);
    this.handleClick = this.handleClick.bind(this);
    

    
    this.state = {
      activeIndex: -1,
        eventid: this.props.item.id,
        matchid: getQueryVariable("matchid"),
        item : this.props.item,
    currentUser : this.props.token,
        curPlayerReady: false,
        progress: 0,
        selectedFile: null,
        matchidFind: this.props.matchidFind,
        isloading: this.props.isLoading,
        isUpLoading: false,
        progressLable: "I Win",
      successful: false,
      loading: false,
      message: ""
    };
  }
  componentWillReceiveProps(newProps) {
    
    this.setState({ eventid: newProps.item.id });
    this.setState({ currentUser: newProps.token });
    this.setState({ matchidFind: newProps.matchidFind });
    this.setState({ item: newProps.item });
    this.setState({ isloading:false });
    
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
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
  showDetails(player){
    $('.gdetails').addClass('hide');
    $('.gdetails.no'+player).removeClass('hide');
    
      }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    userService.joinEvent(this.state.item.id).then(
      (response) => {
      
        //alert(response)
        if (response.indexOf("successful") > -1) {
          //this.reGetevents();
          Toast.fire({
            icon: "success",
            title: "Joined.",
          });
          
          
        } else {
          this.setState({
            isloading: true,
          });
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
                this.state.history.push("/panel/cashier");
              }
            });
          } else if (response == "tagError") {
            var e = this.state.item.gameName;
            var p = this.state.item.gameConsole;
            var currentUser = this.state.currentUser;
          if(p=='PS4'||e=='PS4'){e='PSN';p='PSN';}
          if(p=='PS5'||e=='PS5'){e='PSN';p='PSN';}
          if(p=='XBOX'||e=='XBOX'){e='XBOX';p='XBOX';}
          
            
            handleTagForm(e.replace(' Warzone',''),p,currentUser)
           
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
  

  render() {
    let { currentUser, item,progress, isUpLoading, progressLable,matchidFind,matchid,isloading,activeIndex } = this.state;
    var isJoin = false;
   var  lists = item.matchTables;
   lists.sort((a, b) => (a.level < b.level) ? 1 : -1)
   if((item.status=='InPlay' || item.status=='Pending' || item.status=='Ready') && item.gameMode=='Tournament'){
    lists.map((tblmatch, w) => {
      if(tblmatch.status=='InPlay' || tblmatch.status=='Pending' || tblmatch.status=='Ready'){
        if(!matchLevelFind){matchLevelFind = tblmatch;}
      }
      if(tblmatch.status!='Finished' && (tblmatch.matchPlayers[0].username==currentUser.username || tblmatch.matchPlayers[1].username==currentUser.username)){
        mymatchFind = tblmatch;
      }
    }

    )
    
      //matchidFind = lists.filter( (list) => list.id === );
    }
   
    if(matchLevelFind && activeIndex == -1){this.setState({activeIndex:(matchLevelFind.level-1)})}
    
    
    var activePlayer = 0; 
    {item.players.map((user, z) => (
     <>
        {currentUser.username ==
          user.username && (isJoin = true)}
       

      </>
    ))}
    const panels = item.matchLevel.map((match, i) => {
      var hatchbackCar = lists.filter( (list) => list.level === item.matchLevel[i].level);
       hatchbackCar.sort((a, b) => (a.id > b.id ? 1 : -1));
       
      return({
      key: `panel-${i}`,
      title: {
        content: (hatchbackCar.length == 1 ? (getMatchTitle(hatchbackCar[0].level,item.totalPlayer)):(getMatchTitle(hatchbackCar[0].level,item.totalPlayer)+" - "+hatchbackCar.length+" match")),
        icon: 'none',
      },
     
      content: hatchbackCar.map(
        (mtch, z) => {
          
          return (
            <>
            {z==0 && (<Countdown
        renderer={rendererBig}
        size="mini"
        finish={'@@@'+item.status}
       
        txt={"@@@Start at"}
        
        date={hatchbackCar[0].startTime}
      />)}
            <Link key={z} onClick={() =>(this.props.passedFunction(mtch.id))} to={'/panel/matchlobby?id='+item.id+'&matchid='+mtch.id}>
            <Segment inverted  style={{background:'none !important'}}>

<Grid columns={2}>
<Grid.Column colowr={mtch.winner == mtch.matchPlayers[0].username && ('red')}>
{vsComponentPlayer(
item,
mtch,
0,
matchid,
currentUser,
isloading,
false
)}
</Grid.Column>
<Grid.Column colowr={mtch.winner == mtch.matchPlayers[1].username && ('red')}>
{vsComponentPlayer(
item,
mtch,
1,
matchid,
currentUser,
isloading,
false
)}
</Grid.Column>
</Grid>

<Divider vertical inverted>VS</Divider>
</Segment>
</Link>
<Divider  inverted fitted></Divider>
           
            </>
          );
        })
        
      })
    })
  
    
    setTimeout(() => {$("#jsonhtml").html($("#jsonhtml2").text());},1000)
    return (
      <>
       <Col className="mx-auto text-center" lg="10" md="11">
      
        {vsComponentTitle(item)}
        <Divider fitted style={{ opacity: 0 }} />
      <Countdown renderer={rendererBig} match={lists[0]} txt="@@@Start at" colorfinish={getColorStatus(item.status)} finish={item.status+'@@@Not Avalable'} btn={printEventBTN(item,currentUser,isloading,activePlayer,isJoin,mymatchFind,this.handleJoinMatch)} date={item.expire} />
      
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
                                  <>
                                      
                                        {matchLevelFind && item.status !=  'Finished'&& (
                                          <>
                                           <Statistic inverted color="violet" size="mini">
            <Statistic.Label>Match Level</Statistic.Label>
              <Statistic.Value>{getMatchTitle(matchLevelFind.level,item.totalPlayer)}</Statistic.Value>
              
            </Statistic>

</>
                                        )}
                                        
                                      </>
                                    
                                  )}
      
      
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
                                      <Accordion
    defaultActiveIndex={[0, 1]}
    panels={panels}
    exclusive={false}
    fluid
    inverted
    
  />
        
                                   
                                        
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
        </>
    );
  }
}

export default withRouter(TournamentSection) ;