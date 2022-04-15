import React, { Component } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import AuthService from "services/auth.service";
import eventBus from "views/eventBus";
import printMatchBlock from "components/matchblock.component";

// react-bootstrap components
import { Row, Col } from "react-bootstrap";

//const EventList = JSON.parse(userService.getEvents());

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: this.props.token,
    };
  }

  componentDidMount() {
    eventBus.on("eventsData", (event) => {
      // console.log("socket events: "+events);

      this.setState({ events: event, isLoading: false });
      console.log("change state: " + this.state.isLoading);
    });
  }

  render() {
    let { events, isLoading } = this.state;
    events = JSON.parse(events);

    const currentUser = AuthService.getCurrentUser();
    var Balance = currentUser.balance;
    if (!Balance) {
      Balance = 0;
    }
    //console.log("dash = "+EventList)

    console.log("e-l : " + events);
    const getBlockChallenge = (filtermode) => {
      if (events != []) {
        return events.map((item, i) => {
          if (
            (filtermode == "Wins" && item.status == "Finished") ||
            item.status == filtermode ||
            ("All" == filtermode && item.status != "Expire")
          ) {
            item.players.sort((a, b) => (a.id > b.id ? 1 : -1));
            var blnShow = false;
            {
              item.players.map((player, j) => {
                if (player.username == currentUser.username) {
                  blnShow = true;
                }
              });
            }
            var timestamp = item.expire;
            var date = new Date(timestamp);
            //date.setMinutes(date.getMinutes() + item.timeMinute);
            var now = new Date();
            var dateExpired = date.toISOString();

            var dateNow = now.toISOString();

            if (!blnShow) return null;
            return (
              <Col lg="4" xl="4" key={i}>
                {printMatchBlock(item)}
              </Col>
            );
          } else {
            return null;
          }
        });
      }
    };

    return (
      <>
        <Row>{getBlockChallenge("all")}</Row>
      </>
    );
  }
}

export default Dashboard;
