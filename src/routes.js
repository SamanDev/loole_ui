/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import MyMatches from "views/MyMatches.js";
import Cashier from "views/Cashier.js";
import CreateMatch from "views/Add.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/RegularTables.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import ReactTables from "views/Tables/ReactTables.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import ForgetPassPage from "views/Pages/ForgetPassPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LockScreen from "views/LockScreen.js";
import Landing from "views/Pages/Landing.js";

var routes = [
  
  {
    path: "/profile",
    layout: "/panel",
    name: "Profile",
    icon: "nc-icon nc-circle-09",
    component: UserPage,
    show:false
  },
  {
    path: "/dashboard",
    layout: "/panel",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    show:true
  },
  {
    path: "/mymatches",
    layout: "/panel",
    name: "My Matches",
    icon: "nc-icon nc-controller-modern",
    component: MyMatches,
    show:true
  },
  {
    path: "/cashier",
    layout: "/panel",
    name: "Cashier",
    icon: "nc-icon nc-bank",
    component: Cashier,
    show:true
  },
  {
    path: "/create",
    layout: "/panel",
    name: "Create",
    icon: "nc-icon nc-simple-add",
    component: CreateMatch,
    show:true
  },
  {
    path: "/lobby",
    layout: "/panel",
    name: "Match Lobby",
    icon: "nc-icon nc-simple-add",
    component: LockScreenPage,
    show:false
  },
  
  {
    path: "/login-page",
    layout: "/auth",
    name: "Login Page",
    icon: "nc-icon nc-chart-pie-35",
    component: LoginPage,
    show:false
  },
  {
    path: "/forget-page",
    layout: "/auth",
    name: "Forget Password",
    icon: "nc-icon nc-chart-pie-35",
    component: ForgetPassPage,
    show:false
  },
  {
    path: "/register-page",
    layout: "/auth",
    name: "Register",
    icon: "nc-icon nc-chart-pie-35",
    component: RegisterPage,
    show:false
  },
  {
    path: "/",
    layout: "/home",
    name: "Home",
    icon: "nc-icon nc-chart-pie-35",
    component: Landing,
    show:false
  },
];
export default routes;
