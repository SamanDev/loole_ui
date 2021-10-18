
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect,useHistory } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/landing-page.css";
import "assets/css/style.css";

// sections for this page
export * from "const";
import AuthLayout from "layouts/Auth.js";
import LandLayout from "layouts/Land.js";
import LandMobileLayout from "layouts/LandMobile.js";
import AdminLayout from "layouts/Admin.js";
import LockLayout from "layouts/Lock.js";
import PanelLayout from "layouts/Panel.js";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

ReactDOM.render(
  <RecoilRoot>
  <BrowserRouter>
    <Switch>
      
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/panel" render={(props) => <PanelLayout text="hi" {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/lock" render={(props) => <LockLayout {...props} />} />
      <Route path="/game/:id" render={(props) => <LandLayout {...props} />} />
      <Route path="/mobile" render={(props) => <LandLayout {...props} />} />
      <Route path="/home" render={(props) => <LandLayout {...props} />} />
      <Route path="/user" render={(props) => <LandLayout {...props} />} />
      <Redirect from="/" to="/auth/login-page" />
      
    </Switch>
  </BrowserRouter>
  </RecoilRoot>
  ,
  document.getElementById("root")
);
