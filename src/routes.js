



var routes = [
  
  {
    path: "/profile",
    layout: "/panel",
    name: "Profile",
    icon: "nc-icon nc-circle-09",
    component: 'Profile',
    show:false
  },
  {
    path: "/admin",
    layout: "/panel",
    name: "Admin",
    icon: "nc-icon nc-circle-09",
    component: 'Admin',
    show:false
  },
  {
    path: "/adminevents",
    layout: "/panel",
    name: "AdminEvents",
    icon: "nc-icon nc-circle-09",
    component: 'AdminEvents',
    show:false
  },
  {
    path: "/create",
    layout: "/panel",
    name: "CreateEvent",
    icon: "nc-icon nc-simple-add",
    component: 'CreateMatch',
    show:false
  },
  {
    path: "/*",
    layout: "/user",
    name: "User",
    icon: "nc-icon nc-circle-09",
    component: 'User',
    show:false
  },
  {
    path: "/dashboard",
    layout: "/panel",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: 'Dashboard',
    show:true
  },
  {
    path: "/rewards",
    layout: "/panel",
    name: "Rewards",
    icon: "nc-icon nc-notification-70",
    component: 'Rewards',
    show:true
  },
  {
    path: "/mymatches",
    layout: "/panel",
    name: "My Matches",
    icon: "nc-icon nc-controller-modern",
    component: 'MyMatches',
    show:false
  },
  {
    path: "/market",
    layout: "/panel",
    name: "MarketPlace",
    icon: "nc-icon nc-refresh-02",
    component: 'Market',
    show:true
  },
  {
    path: "/cashier",
    layout: "/panel",
    name: "Cashier",
    icon: "nc-icon nc-bank",
    component: 'Cashier',
    show:true
  },
  {
    path: "/create",
    layout: "/panel",
    name: "Create",
    icon: "nc-icon nc-simple-add",
    component: 'Create',
    show:false
  },
  {
    path: "/logut",
    layout: "/panel",
    name: "Logout",
    icon: "nc-icon nc-button-power",
    component: 'Logout',
    show:false
  },
  
  {

    path: "/",
    layout: "/lobby",
    name: "Match Lobby",
    icon: "nc-icon nc-simple-add",
    component: 'LockScreenPage',
    show:false
  },
  {
 
    path: "/",
    layout: "/matchlobby",
    name: "Match Lobby",
    icon: "nc-icon nc-simple-add",
    component: 'LockScreenPage',
    show:false
  },
  
  {
    path: "/",
    layout: "/home",
    name: "Home",
    icon: "nc-icon nc-chart-pie-35",
    component: 'Landing',
    show:false
  },
  {
    path: "/",
    layout: "/mobile",
    name: "Mobbile",
    icon: "nc-icon nc-chart-pie-35",
    component: 'LandingMobile',
    show:false
  },
  {
    path: "/*",
    layout: "/game",
    name: "User",
    icon: "nc-icon nc-circle-09",
    component: 'Games',
    show:false
  }  ,
  {
    path: "/*",
    layout: "/content",
    name: "User",
    icon: "nc-icon nc-circle-09",
    component: 'Content',
    show:false
  },
];
export default routes;
