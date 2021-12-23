import React, { Component } from "react";



import Moment from "moment";
import CurrencyFormat from "react-currency-format";
import { IMaskInput } from "react-imask";
import { withRouter } from "react-router-dom";
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
import { POSTURL,defUser } from 'const';
import MatchCard from "components/matchcard.component";
import {
  Badge,
  
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
  rendererBig,
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
  haveAdmin,
  handleTagForm,
  vsComponent,
  getColorStatus,
  getGroupBadgeBlock,
  printJoinalerts,
} from "components/include";
import {
  Card,
  
  Button,
  Segment,Divider
} from "semantic-ui-react";
import { UPLOADURL, POSTURLTest } from "const";


const API_URL_TEST = POSTURLTest;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,

});

var isInPlayers = false;
var matchidFind = [];
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
var matchLevelFind = null;
var isJoin = false;

class LeagueSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleLeaveMatch = this.handleLeaveMatch.bind(this);
    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.printErr = this.printErr.bind(this);
    this.fileUpload = React.createRef();
    this.state = {
      eventid: this.props.item.id,
      matchid: getQueryVariable("matchid"),
      item: this.props.item,
      currentUser: this.props.token,
      curPlayerReady: false,
      progress: 0,
      selectedFile: null,
      matchidFind: this.props.matchidFind,
      isloading: this.props.isLoading,
      isUpLoading: false,
      progressLable: "I Win",
      successful: false,
      loading: false,
      message: "",
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ eventid: newProps.item.id });
    this.setState({ currentUser: newProps.token });
    this.setState({ matchidFind: newProps.matchidFind });
    this.setState({ item: newProps.item });

    this.setState({ isloading: newProps.isLoading });
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
        (error) => {
          this.printErr(error);
        }
      );
  }
  
  handleChatUpload = () => {
    this.setState({
      progress: 1,
      progressLable: "0%",
      isUpLoading: true,
    });
    let uploadInfo = new FormData();
    uploadInfo.append("id", this.state.eventid);
    if (this.state.matchid) {
      uploadInfo.append("idMatch", this.state.matchid);
    }
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
        this.setState({
          progressLable: "I win",
          isUpLoading: false,
        });
      });
  };
  setProgress(e) {
    this.setState({
      progress: e,
      progressLable: e + "%",
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

  handlechangeReadyEvent(checked) {
    //firstLoad = false;
    this.setState({
      loading: true,
    });
    //this.setState({ curPlayerReady: checked });
    userService.changeReadyEvent(this.state.eventid).then(
      (response) => {
        if (response.data == "changeReadyEvent successful") {
          this.setState({
            loading: false,
          });

          //this.reGetevents();
        }
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {
        this.printErr(error);
      }
    ).catch((error) => {
      this.printErr(error);
    });
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
  showDetails(player) {
    $(".gdetails").addClass("hide");
    $(".gdetails.no" + player).removeClass("hide");
  }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    var GName = {
      value: this.state.item.gameName + " - " + this.state.item.gameConsole,
      label: this.state.item.gameName + " - " + this.state.item.gameConsole,
    };
    userService.joinEvent(this.state.item.id).then(
      (response) => {
        this.setState({
          loading: false,
        });
        //alert(response)
        if (response.data.accessToken) {
          this.props.onUpdateItem("currentUser", response.data);

          Toast.fire({
            icon: "success",
            title: "Joined.",
          });
        } else {
          

          {
            printJoinalerts(
              response.data,
              GName,
              this.state.currentUser,
              handleTagForm
            );
          }
        }
      },
      (error) => {
        this.printErr(error);
      }
    ).catch((error) => {
      this.printErr(error);
    });
  }
  handleLeaveMatch(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    userService.leaveEvent(this.state.eventid).then(
      (response) => {
        this.setState({
          loading: false,
        });
        if (response.data.accessToken) {
          this.props.onUpdateItem("currentUser", response.data);

          Toast.fire({
            icon: "success",
            title: "Un Joined.",
          });
        } else {
          

          {
            printJoinalerts(
              response.data,
              GName,
              this.state.currentUser,
              handleTagForm
            );
          }
        }
      },
      (error) => {
        this.printErr(error);
      }
    ).catch((error) => {
      this.printErr(error);
    });
  }
  handleLoseMatch(e) {
    this.setState({
      loading: true,
    });
    if (this.state.matchid) {
      userService.loseEvent(this.state.eventid, this.state.matchid).then(
        (response) => {
          //this.reGetevents();
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {
          this.printErr(error);
        }
      );
    } else {
      userService.loseEvent(this.state.eventid).then(
        (response) => {
          //this.reGetevents();
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {
          this.printErr(error);
        }
      );
    }
  }
  
  printErr = (error) => {
    var GName = {
      value: this.state.item.gameName + " - " + this.state.item.gameConsole,
      label: this.state.item.gameName + " - " + this.state.item.gameConsole,
    };
    this.setState({
      successful: false,
      message: "",
      submit: false,
      loading: false,
    });
    if (error?.response?.data?.status == 401) {
      this.props.onUpdateItem("openModalLogin", true);
      localStorage.setItem("user", JSON.stringify(defUser));
      this.props.onUpdateItem("currentUser", defUser);
    } else {
      const resMessage = error?.response?.data || error.toString();

      if (resMessage.indexOf("Error") > -1) {
        {
          printJoinalerts(
            resMessage,
            GName,
            this.state.currentUser,
            handleTagForm
          );
        }
      } else {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: resMessage,
        });
      }
    }
  }
  render() {
    let {
      currentUser,
      item,
      progress,
      isUpLoading,
      progressLable,
      matchidFind,
    } = this.state;

    var _mode = " 1 vs 1 ";
    var _color = "#404040";

    var activePlayer = 0;
    item.players.sort((a, b) => (a.id > b.id ? 1 : -1));
    return (
      <>
        {matchidFind.matchPlayers.map((player, j) => {
          if (player.username != "") {
            activePlayer++;
          }

          if (
            player.username == currentUser.username &&
            player.ready &&
            !this.state.curPlayerReady
          ) {
            this.setState({ curPlayerReady: true });
          }
          return <></>;
        })}

        <Col
          className="mx-auto text-center "
          lg="8"
          md="10"
          style={{ padding: 0, marginTop: 20 }}
        >
          {vsComponent(
            item,
            matchidFind,
            this.state.matchid,
            this.state.currentUser,
            this.state.loading,
            activePlayer,
            this.handlechangeReadyEvent,
            this.handleJoinMatch,
            this.handleLeaveMatch,
            this.handlecAlertLost,
            this.fileUpload,
            this.onChangeHandler,
            this.handlecAlertWin,
            isUpLoading,
            progress,
            progressLable
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

export default withRouter(LeagueSection);
