import React, { Component } from "react";

import Countdown from "react-countdown";
import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import uploadHeader from "services/upload-header";
import axios from "axios";
import { defUser } from "const";
import MatchCard from "components/matchblock.component";
import { Col, ProgressBar } from "react-bootstrap";
import {
  printMatchBTN,
  handleTagForm,
  vsComponentPlayer,
  printJoinalerts,
  vsComponentTitle,
  printStatus,
  isPlayerInMatch,
  getCode,
  getColor,
  rendererBig,
  getMatchTitle,
  findActiveMatch,
  date_edit_card,
} from "components/include.js";
import { Divider, Segment, Grid, Statistic, Button } from "semantic-ui-react";
import { POSTURLTest } from "const";
import Admin from "components/events/admin.component";
import UserContext from "context/UserState";
import AddToCal from "components/addtocal.component";
const API_URL_TEST = POSTURLTest;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

class MatchSection extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);

    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.printErr = this.printErr.bind(this);
    this.fileUpload = React.createRef();
    this.state = {
      myState: this.props.myState,
      item: this.props.event,

      eventid: this.props.event.id,
      matchid: this.props.matchIDQ,
      progress: 0,
      selectedFile: null,
      matchidFind: this.props.findStateId(this.props.myState, "match"),
      isUpLoading: false,
      progressLable: "I Win",
      successful: false,
      loading: false,
      message: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.event !== state.item ||
      props.myState !== state.myState ||
      props.matchIDQ !== state.matchid
    ) {
      return {
        myState: props.myState,
        item: props.event,
        loading: false,
        eventid: props.event.id,
        matchid: props.matchIDQ,
        matchidFind: props.findStateId(props.myState, "match"),
      };
    }
    return null;
  }

  handleClashFinished(e) {
    this.setState({
      loading: true,
    });
    userService
      .saveTags("ClashRoyale", "finish", this.state.tag, this.state.eventid)
      .then(
        () => {
          this.setState({
            loading: false,
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
        this.props.setVisible(true);
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
    userService
      .changeReadyEvent(this.state.eventid)
      .then(
        (response) => {
          if (response.data == "changeReadyEvent successful") {
            //this.reGetevents();
          }
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {
          this.printErr(error);
        }
      )
      .catch((error) => {
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

  handleLoseMatch() {
    this.setState({
      loading: true,
    });
    if (this.state.matchid) {
      userService
        .loseEvent(this.state.eventid, this.state.matchid)
        .then(
          (response) => {
            if (response.data == "changeReadyEvent successful") {
              //this.reGetevents();
            }
            //this.props.history.push("/panel/dashboard");
          },
          (error) => {
            this.printErr(error);
          }
        )
        .catch((error) => {
          this.printErr(error);
        });
    } else {
      userService
        .loseEvent(this.state.eventid)
        .then(
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
        )
        .catch((error) => {
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
    if (
      error?.response?.data?.status == 401 ||
      error?.data?.status == 401 ||
      error?.response?.data?.details[0] == "Access is denied"
    ) {
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
            this.context.uList.currentUser,
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
  };
  render() {
    const item = this.state.item;

    const tit = this.props.tit;
    const desc = this.props.desc;
    const currentUser = this.context.uList.currentUser;

    const eventIDQ = this.state.item.id;
    const matchid = this.state.matchid;
    const match = findActiveMatch(item, matchid, currentUser.username);

    let { progress, isUpLoading, progressLable, loading } = this.state;

    var _finishTxt = "Not Joinable";
    //if (match.status) { _finishTxt = match.status}
    //if (match.winner) { _finishTxt = match.winner}
    var _mode = " 1 vs 1 ";
    var _color = "#404040";

    if (item.gameMode == "Tournament" || item.gameMode == "League") {
      _mode = item.gameMode;
    }
    var _d = new Date();
    var _s = new Date(match.startTime);
    return (
      <>
        <Col
          className="mx-auto text-center "
          lg="8"
          md="10"
          style={{ padding: 0, marginTop: 20, overflow: "hidden" }}
        >
          <>
            {vsComponentTitle(item)}
            <Divider fitted style={{ opacity: 0 }} />
            {printStatus(
              match,
              _mode,
              _color,
              item.status + "@@@" + _finishTxt,
              item.status,
              "yes",
              matchid
            )}
            {match.status != item.status &&
              match.status == "Pending" &&
              printStatus(
                match,
                "Status",
                _color,
                match.status + "@@@" + _finishTxt,
                match.status,
                "yes",
                matchid
              )}

            <Countdown
              renderer={rendererBig}
              finish={item.status + "@@@" + _finishTxt}
              txt="@@@Start at"
              match={match}
              colorfinish={getColor(item.prize)}
              date={date_edit_card(match.startTime)}
            />
            <Divider fitted style={{ opacity: 0 }} />
            {_s > _d && match.status == "Pending" && (
              <>
                <div
                  style={{
                    position: "relative",
                    maxWidth: 300,
                    margin: "auto",
                  }}
                >
                  <AddToCal item={item} tit={tit} desc={desc} match={match} />
                </div>
                <br />
                <br />
              </>
            )}

            <Admin {...this.props} />
            <Divider fitted style={{ opacity: 0 }} />

            <Statistic inverted color="violet" size="mini">
              <Statistic.Label>Match Level</Statistic.Label>
              <Statistic.Value>
                {getMatchTitle(match.level, item.totalPlayer)}
              </Statistic.Value>
            </Statistic>
            <Segment basic className="vsv">
              <Grid columns={2}>
                <Grid.Column
                  style={{ background: "none !important" }}
                  className={
                    match.winner != null &&
                    match.winner == match.matchPlayers[0]?.username
                      ? "coverwinner"
                      : null
                  }
                >
                  {vsComponentPlayer(
                    item,
                    match,
                    0,
                    eventIDQ,
                    currentUser,
                    loading,
                    false,
                    false,
                    matchid,
                    this.props.setVisible,
                    this.props.setMessageBox
                  )}
                </Grid.Column>
                <Grid.Column
                  style={{ background: "none !important" }}
                  className={
                    match.winner != null &&
                    match.winner == match.matchPlayers[1]?.username
                      ? "coverwinner"
                      : null
                  }
                >
                  {vsComponentPlayer(
                    item,
                    match,
                    1,
                    eventIDQ,
                    currentUser,
                    loading,
                    false,
                    false,
                    matchid,
                    this.props.setVisible,
                    this.props.setMessageBox
                  )}
                </Grid.Column>
              </Grid>

              <Divider vertical inverted>
                VS
              </Divider>
            </Segment>
            {match.status == "InPlay" && (
              <>
                {isPlayerInMatch(match, currentUser.username) && (
                  <>
                    {item.gameName != "ClashRoyale" && (
                      <Statistic inverted size="small">
                        <Statistic.Label>Match Code</Statistic.Label>
                        <Statistic.Value className="matchcode">
                          {getCode(match.matchCode)}
                        </Statistic.Value>
                      </Statistic>
                    )}
                    <Button.Group size="big" widths="3">
                      <Button
                        color="red"
                        onClick={this.handlecAlertLost}
                        disabled={loading}
                        loading={loading}
                      >
                        I Lost
                      </Button>
                      <Button.Or color="red" style={{ minWidth: 5 }} />
                      <Button
                        animated
                        onClick={this.handlecAlertWin}
                        color="green"
                        inverted
                        disabled={isUpLoading}
                      >
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
                      onChange={this.onChangeHandler}
                    />
                  </>
                )}
              </>
            )}
          </>

          <Divider hidden />
          <div
            className="ui cards fours centered"
            style={{ textAlign: "left" }}
          >
            <MatchCard item={item} matchidFind={match} />
          </div>
        </Col>
      </>
    );
  }
}

export default MatchSection;
