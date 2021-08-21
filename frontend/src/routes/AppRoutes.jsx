import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Events from "../pages/EventsPage/Events";
import Home from "../pages/HomePage/Home";
import Footer from "../component/common/footer/Footer";
import ContactUs from "../pages/ContactUsPage/ContactUs";
import Navbar from "../component/common/navbar/Navbar";
import Clients from "../pages/ClientPage/ClientPage";
import LoginScreen from "../pages/LoginPage/LoginScreen";
import ForgotPasswordScreen from "../pages/LoginPage/ForgotPasswordScreen";
import RegisterScreen from "../pages/LoginPage/RegisterScreen";

const AppRoutes = () => (
  <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/events" component={Events} exact />
        <Route path="/Clients" component={Clients} exact />
        <Route path="/contact" component={ContactUs} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/forgotpassword" component={ForgotPasswordScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default AppRoutes;
