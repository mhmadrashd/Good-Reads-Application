import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home/Home";
// import HomeUser from "./HomeUser/HomeUser";
// import SignUp from './Components/UserForms/SignUp'
import { Provider } from "react-redux";
import DataStore from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
// import VerticalTabs from "./Components/dashboard/SideTabs/SideBarTabs";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={DataStore}>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </Provider>
);

    // <SignUp />
    // <VerticalTabs />