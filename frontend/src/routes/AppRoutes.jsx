import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "../pages/AboutUsPage/AboutUs";
import Events from "../pages/EventsPage/Events";
import Home from "../pages/HomePage/Home";
import Footer from "../component/common/footer/Footer";
import ContactUs from "../pages/ContactUsPage/ContactUs";
import Navbar from "../component/common/navbar/Navbar";
import Clients from "../pages/ClientPage/ClientPage";
import LoginScreen from "../pages/LoginPage/LoginScreen";
import ForgotPasswordScreen from "../pages/LoginPage/ForgotPasswordScreen";
import RegisterScreen from "../pages/LoginPage/RegisterScreen";
import ResetPasswordScreen from "../pages/LoginPage/ResetPasswordScreen";
import Admin from "../pages/AdminPage/AdminPage";
import LapAllo from "../pages/AdminPage/Laps";
import AllAssignmnets from "../pages/AdminPage/AllAssignments";
import CreateAssignment from "../pages/AdminPage/CreateAssignmentt";
import CreateLapAllo from "../pages/AdminPage/CreateLapAllo";
import EmployeePoints from "../pages/AdminPage/EmployeePoints";
import AllEmployees from "../pages/AdminPage/AllEmployees";
import InsertEmployee from "../pages/AdminPage/InsertEmployee";
import EditAssignment from "../pages/AdminPage/EditAssignment";
import Assignment from "../pages/AdminPage/Assignment";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import CreateReview from "../modules/AdminModules/CreateReview";
import EditReview from "../modules/AdminModules/EditReview";
import ManagerEditReview from "../modules/AdminModules/ManagerEditReview";
import DirectorEditReview from "../modules/AdminModules/DirectorEditReview";
import PartnerEditReview from "../modules/AdminModules/PartnerEditReview";
import DisplayReview from "../modules/AdminModules/DisplayReview";
import CreateLaptop from "../modules/AdminModules/CreateLaptop";
import LaptopRepair from "../modules/AdminModules/LaptopRepair";
import CreateLaptopRepair from "../modules/AdminModules/CreateLaptopRepair";
import Laptops from "../pages/AdminPage/CreateLaptop";
import LaptopInventory from "../pages/AdminPage/LaptopInventory";
import CreateLaptops from "../pages/AdminPage/CreateLaptop";
import LaptopsRepair from "../pages/AdminPage/LaptopRepair";
import CreateLaptopsRepair from "../pages/AdminPage/CreateLaptopRepair";
import EditLapAllo from "../pages/AdminPage/EditLapAllo";
import WorkReport from "../pages/AdminPage/WorkReport";
import CompanyPerfomance from "../pages/AdminPage/CompanyPerformance";
import EditEmployee from "../pages/AdminPage/EditEmployee";
import CreateExecutive from "../modules/AdminModules/CreateExecutive";
import NewExecutive from "../modules/AdminModules/NewExecutive";
import EditExecutive from "../modules/AdminModules/EditExecutive";
import DisplayExecutive from "../modules/AdminModules/DisplayExecutive";
import CreateNotice from "../modules/AdminModules/CreateNotice";
import TopPerformers from "../modules/AdminModules/TopPerformers";
import NoticeComPerf from "../modules/AdminModules/NoticeComPerf";
import PendingAssignment from "../pages/AdminPage/PendingAssignment";
import EmployeeReport from "../modules/AdminModules/EmployeeReport";
import EmpReportUpload from "../modules/AdminModules/EmpReportUpload";

import PayrollPage from "../pages/PayrollPage/PayrollPage";
import CreatePayroll from "../modules/AdminModules/CreatePayroll";
import DisplayPayroll from "../modules/AdminModules/DisplayPayroll";
import EditPayroll from "../modules/AdminModules/EditPayroll";

import ManagerReview from "../modules/AdminModules/ManagerReview";
import EditManagerReview from "../modules/AdminModules/ManagerReview";
import DirectorReview from "../modules/AdminModules/DirectorReview";
import EditDirectorReview from "../modules/AdminModules/DirectorReview";
import PartnerReview from "../modules/AdminModules/PartnerReview";
import EditPartnerReview from "../modules/AdminModules/PartnerReview";
import AllReports from "../pages/AdminPage/AllReports";

import CreateClient from "../modules/AdminModules/CreateClient";
import DisplayClient from "../modules/AdminModules/DisplayClient";
import EditClient from "../modules/AdminModules/EditClient";
import ClientsRoutesPage from "../pages/ClientsRoutesPage/ClientsRoutesPage";

import ProfilePage from "../modules/AdminModules/ProfilePage";
import CreateProfile from "../modules/AdminModules/CreateProfile";
import EditProfile from "../modules/AdminModules/EditProfile";
import DisplayProfile from "../modules/AdminModules/DisplayProfile";

import AdminAttendance from "../modules/AdminModules/AdminAttendance";
import CreateAttendance from "../modules/AdminModules/CreateAttendance";

const AppRoutes = () => (
  <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/aboutus" component={AboutUs} exact />
        <Route path="/events" component={Events} exact />
        <Route path="/Clients" component={Clients} exact />
        <Route path="/contact" component={ContactUs} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/forgotpassword" component={ForgotPasswordScreen} exact />
        <Route
          exact
          path="/passwordreset/:resetToken"
          component={ResetPasswordScreen}
        />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/admin" component={Admin} exact />
        <Route path="/laptopallocation" component={LapAllo} exact />
        <Route path="/allassignments" component={AllAssignmnets} exact />
        <Route path="/createassignment" component={CreateAssignment} exact />
        <Route path="/createlapallocation" component={CreateLapAllo} exact />
        <Route path="/AllEmployees" component={AllEmployees} exact />
        <Route path="/EmployeePoints" component={EmployeePoints} exact />
        <Route path="/createlaptop" component={CreateLaptops} exact />
        <Route path="/repairinglaptop" component={LaptopsRepair} exact />
        <Route
          path="/createlaptoprepair"
          component={CreateLaptopsRepair}
          exact
        />
        <Route
          exact
          path="/editassignment/:assignment"
          component={EditAssignment}
        />
        <Route exact path="/employeereport" component={EmployeeReport} />
        <Route exact path="/empreportupload" component={EmpReportUpload} />
        <Route exact path="/assignment/:assignment" component={Assignment} />
        <Route path="/review" component={ReviewPage} exact />
        <Route path="/add" exact component={CreateReview}></Route>
        <Route path="/edit/:id" exact component={EditReview}></Route>
        <Route
          path="/editmanagerreview/:id"
          exact
          component={ManagerEditReview}
        ></Route>
        <Route
          path="/editdirectorreview/:id"
          exact
          component={DirectorEditReview}
        ></Route>
        <Route
          path="/editpartnerreview/:id"
          exact
          component={PartnerEditReview}
        ></Route>
        <Route path="/post/:id" exact component={DisplayReview}></Route>
        <Route exact path="/editlapallo/:assignment" component={EditLapAllo} />
        <Route path="/reportwork" component={WorkReport} exact />
        <Route path="/InsertEmployee" component={InsertEmployee} exact />
        /*Anujitha Routes*/
        <Route path="/allreports" component={AllReports} exact />
        <Route path="/companyperformance" component={CompanyPerfomance} exact />
        <Route path="/EditEmployee/:id" component={EditEmployee} exact />
        <Route path="/createexecutive" component={CreateExecutive} exact />
        <Route path="/newexecutive" component={NewExecutive} exact />
        <Route path="/editexecutive/:id" component={EditExecutive} exact />
        <Route
          exact
          path="/PendingAssignments/:id"
          component={PendingAssignment}
        />
        <Route
          path="/displayexecutive/:id"
          component={DisplayExecutive}
          exact
        />
        /*Senara Routes*/
        <Route path="/CreateNotice" component={CreateNotice} exact></Route>
        <Route path="/TopPerformers" component={TopPerformers} exact></Route>
        <Route path="/NoticeComPerf" compoenet={NoticeComPerf} exact></Route>
        /*Dimashi Routes*/
        <Route path="/payroll" component={PayrollPage} exact />
        <Route path="/addpayroll" exact component={CreatePayroll}></Route>
        <Route path="/displaypayroll/:id" component={DisplayPayroll} exact />
        <Route path="/editpayroll/:id" component={EditPayroll} exact />
        <Route path="/allattendance" component={AdminAttendance} exact />
        <Route path="/addattendance" exact component={CreateAttendance}></Route>
        /*Thisarani Routes*/
        <Route path="/client" component={ClientsRoutesPage} exact />
        <Route path="/addclient" exact component={CreateClient}></Route>
        <Route path="/displayclient/:id" component={DisplayClient} exact />
        <Route path="/editclient/:id" component={EditClient} exact />
        /*?? routes*/
        <Route path="/managerreview" component={ManagerReview} exact />
        <Route path="/directorreview" component={DirectorReview} exact />
        <Route path="/partnerreview" component={PartnerReview} exact />
        <Route path="/editmanagerreview" component={EditManagerReview} exact />
        <Route
          path="/editdirectorreview"
          component={EditDirectorReview}
          exact
        />
        <Route path="/editpartnerreview" component={EditPartnerReview} exact />
        <Route path="/profilepage" component={ProfilePage} exact />
        <Route path="/createprofile" component={CreateProfile}></Route>
        <Route path="/editprofile/:id" component={EditProfile}></Route>
        <Route path="/postprofile/:id" component={DisplayProfile}></Route>
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default AppRoutes;
