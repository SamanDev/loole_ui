import React, { lazy } from "react";
//import LandStat from "components/landstat.component";
import { List, Grid, Divider, Icon } from "semantic-ui-react";
const RegisterBtn = lazy(() => import("components/registerBtn"));
const LandStat = lazy(() => import("components/landstat.component"));
import { Link } from "react-router-dom";
const LandNavbar = (prop) => {
  return (
    <>
      <div
        className="section section-gray section-clients section-no-padding"
        style={{ background: "rgb(29 29 29)", color: "#fff" }}
      >
        <div className="container">
          <div className="container text-center">
            <LandStat {...prop} />
            <RegisterBtn {...prop} color="red" />
          </div>
          <Divider inverted />
          <Grid padded style={{ lineHeight: "300%" }}>
            <Grid.Row>
              <Grid.Column
                mobile={16}
                tablet={6}
                computer={5}
                style={{ minHeight: 150 }}
              >
                <List>
                  <List.Header as="h5">Company</List.Header>
                  <List.Item
                    as="a"
                    href="mailto:info@loole.gg?subject=Contact%20Loole.gg"
                    target="_blank"
                  >
                    <Icon inverted color="grey" name="mail outline" />
                    Contact
                  </List.Item>
                  <List.Item
                    as="a"
                    href="https://www.instagram.com/loole.gg/"
                    target="_blank"
                  >
                    <Icon inverted color="grey" name="instagram" />
                    Instagram
                  </List.Item>
                  <List.Item
                    as="a"
                    href="https://www.facebook.com/Loole.GoodGame/"
                    target="_blank"
                  >
                    <Icon inverted color="grey" name="facebook" />
                    Facebook
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={6} computer={5}>
                <List>
                  <List.Header as="h5">Other</List.Header>
                  <List.Item
                    href="https://looleblog.blogspot.com"
                    as="a"
                    target="_blank"
                  >
                    Blog
                  </List.Item>
                  <List.Item to="/games" as={Link}>
                    Games
                  </List.Item>
                  <List.Item as={Link} to="/content/terms-and-conditions">
                    Terms Conditions
                  </List.Item>
                  <List.Item as={Link} to="/content/privacy-policy">
                    Privacy policy
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={4}
                computer={4}
                style={{ textAlign: "center", minHeight: 120 }}
              >
                <Link
                  to="/home"
                  onClick={() => prop.scrollTo("homes")}
                  style={{ color: "#fff" }}
                >
                  <img
                    src={"/assets/img/logoloole.svg"}
                    alt="loole.gg logo"
                    style={{
                      height: 85,
                      width: 85,

                      margin: "0 10px",
                    }}
                    className="ui"
                  />
                  Loole.gg
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider inverted />
          <p className="text-center">
            &copy; 2021 <a href="https://loole.gg/home">Loole.gg</a>, made with
            love
          </p>
        </div>
      </div>
    </>
  );
};

export default LandNavbar;
