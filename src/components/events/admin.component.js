import React, { Component } from "react";

import adminService from "services/admin.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { defUser } from "const";
import { handleTagForm, printJoinalerts, haveAdmin } from "components/include";
import { Button } from "semantic-ui-react";

class MatchSection extends Component {
  constructor(props) {
    super(props);

    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertLost2 = this.handlecAlertLost2.bind(this);

    this.printErr = this.printErr.bind(this);

    this.state = {
      myState: this.props.myState,
      item: this.props.findStateId(this.props.myState, "eventDef"),
      currentUser: this.props.findStateId(this.props.myState, "currentUser"),
      eventid: this.props.findStateId(this.props.myState, "eventIDQ"),
      matchid: this.props.findStateId(this.props.myState, "matchIDQ"),
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
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    document.title =
      state.item.gameMode +
      " " +
      state.item.gameName +
      " for " +
      state.item.outSign.replace("Dollar", "$").replace("Point", "Diamonds ") +
      state.item.prize +
      " Prize";

    if (props.myState !== state.myState) {
      return {
        myState: props.myState,
        item: props.findStateId(props.myState, "eventDef"),
        currentUser: props.findStateId(props.myState, "currentUser"),
        eventid: props.findStateId(props.myState, "eventIDQ"),
        matchid: props.findStateId(props.myState, "matchIDQ"),
        matchidFind: props.findStateId(props.myState, "match"),
      };
    }
    return null;
  }

  handlecAlertLost(checked) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure? ",
      icon: "question",
      iconColor: "#FB404B",
      text:
        "Please confirm " +
        this.state.matchidFind.matchPlayers[0].username.toUpperCase() +
        " lose.",
      customClass: "dark",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        "Yes, " +
        this.state.matchidFind.matchPlayers[0].username.toUpperCase() +
        " lost.",

      cancelButtonText: "Back",
      confirmButtonColor: "#FB404B",
      cancelButtonColor: "rgba(255, 255, 255,.2)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleLoseMatch(
          this.state.matchidFind.matchPlayers[0].username.toUpperCase()
        );
      }
    });
  }
  handlecAlertLost2(checked) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure? ",
      icon: "question",
      iconColor: "#FB404B",
      text:
        "Please confirm " +
        this.state.matchidFind.matchPlayers[1].username.toUpperCase() +
        " lose.",
      customClass: "dark",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        "Yes, " +
        this.state.matchidFind.matchPlayers[1].username.toUpperCase() +
        " lost.",

      cancelButtonText: "Back",
      confirmButtonColor: "#FB404B",
      cancelButtonColor: "rgba(255, 255, 255,.2)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleLoseMatch(
          this.state.matchidFind.matchPlayers[1].username.toUpperCase()
        );
      }
    });
  }

  handleLoseMatch(e) {
    this.setState({
      loading: true,
    });
    if (this.state.item.matchTables.length > 1) {
      adminService
        .loseEventMatch(
          parseInt(this.state.eventid),
          parseInt(this.state.matchid),
          e
        )
        .then(
          () => {},
          (error) => {
            this.printErr(error);
          }
        )
        .catch((error) => {
          this.printErr(error);
        });
    } else {
      adminService
        .loseEvent(parseInt(this.state.eventid), e)
        .then(
          () => {},
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
  };
  render() {
    const item = this.props.findStateId(this.state.myState, "eventDef");
    const currentUser = this.props.findStateId(
      this.state.myState,
      "currentUser"
    );
    const match = this.props.findStateId(this.state.myState, "match");

    let { loading } = this.state;

    return (
      <>
        {haveAdmin(currentUser.roles) && match.status == "InPlay" && (
          <>
            <Button.Group size="big" widths="3">
              <Button
                color={item.matchTables.length > 1 ? "green" : "red"}
                inverted
                onClick={this.handlecAlertLost}
                disabled={loading}
                loading={loading}
              >
                {match.matchPlayers[0].username} Lost
              </Button>

              <Button
                onClick={this.handlecAlertLost2}
                color={item.matchTables.length > 1 ? "green" : "red"}
                inverted
                disabled={loading}
                loading={loading}
              >
                {match.matchPlayers[1].username} Lost
              </Button>
            </Button.Group>
          </>
        )}
      </>
    );
  }
}

export default MatchSection;
