import React, { Component } from "react";



import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import uploadHeader from "services/upload-header";
import axios from "axios";
import { defUser } from 'const';
import MatchCard from "components/matchcard.component";
import {
  Col,
} from "react-bootstrap";
import {
  getQueryVariable,
  handleTagForm,
  vsComponent,
  printJoinalerts,
} from "components/include";
import {
  Divider
} from "semantic-ui-react";
import { POSTURLTest } from "const";


const API_URL_TEST = POSTURLTest;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,

});


class MatchSection extends Component {
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
  componentWillUnmount() {
    document.title = this.props.item.gameMode + ' '+ this.props.item.gameName + ' for ' + this.props.item.outSign.replace('Dollar','$') + this.props.item.amount +  ' Prize';
  }
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.item !== state.item) {
      return {
        eventid: props.item.id,
    
      item: props.item,
      currentUser: props.token,
    
      matchidFind: props.matchidFind,
      isloading: props.isLoading,
      };
    }
    return null;
  }
  
  handleClashFinished(e) {
    this.setState({
      isloading: true,
    });
    userService
      .saveTags("ClashRoyale", "finish", this.state.tag, this.state.eventid)
      .then(
        () => {
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
      .then(() => {
        this.setState({
          progress: 0,
          progressLable: "I win",
          isUpLoading: false,
        });
        document.documentElement.classList.toggle("nav-open");
      })
      .catch(() => {
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
      () => {
        this.props.history.push("/panel/dashboard");
      },
      () => {}
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
  onChangeHandler = () => {
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
              handleTagForm,
              this.props
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
              handleTagForm,
              this.props
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
  handleLoseMatch() {
   
    this.setState({
      loading: true,
    });
    if (this.state.matchid) {
      userService.loseEvent(this.state.eventid, this.state.matchid).then(
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
      
    } else {
      userService.loseEvent(this.state.eventid).then(
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
            handleTagForm,
            this.props
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


    var activePlayer = 0;
    item.players.sort((a, b) => (a.id > b.id ? 1 : -1));
    {matchidFind.matchPlayers.map((player) => {
      if (player.username != "") {
        activePlayer++;
      }

      if (
        player.username == currentUser.username &&
        player.ready &&
        !this.state.curPlayerReady
      ) {
        //this.setState({ curPlayerReady: true });
      }

    })}
    return (
      <>
        

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

export default MatchSection;
