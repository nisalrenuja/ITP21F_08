import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from '../pages/AboutUsPage/AboutUs';
import Events from '../pages/EventsPage/Events';
import Home from '../pages/HomePage/Home';
import Footer from '../component/common/footer/Footer';
import ContactUs from '../pages/ContactUsPage/ContactUs';
import Navbar from '../component/common/navbar/Navbar';
import Blogs from '../pages/BlogPage/BlogPage';

const AppRoutes = () => (
  <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={AboutUs} exact />
        <Route path="/events" component={Events} exact />
        <Route path="/blogs" component={Blogs} exact />
        <Route path="/contact" component={ContactUs} exact />
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default AppRoutes;
