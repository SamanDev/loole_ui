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

import MatchCard  from "components/matchcard.component";
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Transition
} from "semantic-ui-react";
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
    Accordion,
  } from "react-bootstrap";
  import {
    setAvatar,
    getColor,
    getIcon,
    renderer,
    getQueryVariable,
    getCode,
    printStatus,
    getGroupBadge,
    getGroupBadgeList,
    getGroupBadgePrice,
    getModalTag,
    getGameTag,
    getMatchTitle,
    haveGameTag,
    getPlayerTag,
    vsComponentTitle,
    isJson,
    haveAdmin,
    handleTagForm,
    rendererBig,
    printEventBTN,
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
  
  });

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
class MatchTourSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
   
   
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handleLoseMatch = this.handleLoseMatch.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.state = {
      eventid: this.props.item.id,
        matchid: this.props.matchidFind?.id,
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
  showDetails(player){
    $('.gdetails').addClass('hide');
    $('.gdetails.no'+player).removeClass('hide');
    
      }
  
  

  render() {
    let { currentUser, item,progress, isUpLoading, progressLable,matchidFind,isloading,matchid } = this.state;
    var _finishTxt = 'Not Avalable';
    if (matchidFind.winner) { _finishTxt = matchidFind.winner}
    var _mode = " 1 vs 1 ";
      var _color = "#404040";
     
   
     
    
      if (item.gameMode == "Tournament" || item.gameMode == "League") {
        _mode = item.gameMode;
      }
      
     
     
    setTimeout(() => {$("#jsonhtml").html($("#jsonhtml2").text());},1000)
    var activePlayer = 0; 
    {item.players.map((user, z) => (
     <>
        {currentUser.username ==
          user.username && (isJoin = true)}
       

      </>
    ))}
    dateStart = item.startTime;
         dateExpired = item.expire;
    return (
      <>
     <Col
          className="mx-auto text-center "
          lg="8"
          md="10"
          style={{ padding: 0, marginTop: 20 }}
        >
     {vsComponentTitle(item)}
        
            <Divider fitted style={{ opacity: 0 }} />
            {printStatus(matchidFind,_mode,_color ,matchidFind.status+'@@@'+_finishTxt,matchidFind.status)}
            <Divider fitted style={{ opacity: 0 }} />
        
            <Statistic inverted color="violet" size="mini">
            <Statistic.Label>Match Level</Statistic.Label>
              <Statistic.Value>{getMatchTitle(matchidFind.level,item.totalPlayer)}</Statistic.Value>
              
            </Statistic>
        <Countdown renderer={rendererBig} match={matchidFind} txt="@@@Start at" finish="@@@"  date={item.expire} />
        
     
        <Segment inverted  style={{background:'none !important'}}>
      
      <Grid columns={2}>
        <Grid.Column  className={matchidFind.winner == matchidFind?.matchPlayers[0]?.username && "coverwinner"}>
          {vsComponentPlayer(
            item,
            matchidFind,
            0,
            matchid,
            currentUser,
            isloading,
            false
          )}
        </Grid.Column>
        <Grid.Column  className={matchidFind.winner == matchidFind?.matchPlayers[1]?.username && "coverwinner"}>
          {vsComponentPlayer(
            item,
            matchidFind,
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
    {matchidFind.status == "InPlay" && (
                                            <>
                                            {(matchidFind
                                                    .matchPlayers[0].username ==
                                                currentUser.username ||
                                                matchidFind
                                                .matchPlayers[1].username ==
                                                currentUser.username) && (
                                                  <>
                                                  <Statistic inverted size="small">
                        <Statistic.Label>
                        Match Code
                        </Statistic.Label>
                        <Statistic.Value className="matchcode"
                                              >
                                                {getCode(matchidFind.matchCode)}
                                             </Statistic.Value>
                      </Statistic>
                                              
                                              
                                              <Button.Group  size='big'  widths='3'>
    <Button color="red" onClick={this.handlecAlertLost} disabled={isloading}>I Lost</Button>
    <Button.Or color="red" style={{minWidth: 5}}/>
    <Button animated onClick={this.handlecAlertWin}
                    color="green"
                    inverted
                    disabled={isUpLoading}>
  <Button.Content visible>{progressLable}</Button.Content>
  <Button.Content hidden>Upload video</Button.Content>
  {progress > 0 && (
                                                    <div className="prosbar">
                                                      <ProgressBar
                                                        variant="success"
                                                        now={progress}
                                                        label={""}
                                                      />
                                                    </div>
                                                  )}
</Button>
   
  </Button.Group>
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
                                              
                                              </>
                                                )}
                                            </>

                                          )}
                                          <Divider  hidden/>
          <div  className="ui cards fours centered">
          <MatchCard  item={item} matchidFind={matchidFind} />
          </div>
                           
                       
                        </Col>
        </>
    );
  }
}

export default withRouter(MatchTourSection) ;