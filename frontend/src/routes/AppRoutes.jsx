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

import EditAssignment from "../pages/AdminPage/EditAssignment";
import Assignment from "../pages/AdminPage/Assignment";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import CreateReview from "../modules/AdminModules/CreateReview";
import EditReview from "../modules/AdminModules/EditReview";
import ManagerEditReview from "../modules/AdminModules/ManagerEditReview";
import DirectorEditReview from "../modules/AdminModules/DirectorEditReview";
import PartnerEditReview from "../modules/AdminModules/PartnerEditReview";
import DisplayReview from "../modules/AdminModules/DisplayReview";
import EditLapAllo from "../pages/AdminPage/EditLapAllo";
import WorkReport from "../pages/AdminPage/WorkReport";
import CompanyPerfomance from "../pages/AdminPage/CompanyPerformance";

import CreateExecutive from "../modules/AdminModules/CreateExecutive";
import NewExecutive from "../modules/AdminModules/NewExecutive";
import EditExecutive from "../modules/AdminModules/EditExecutive";
import DisplayExecutive from "../modules/AdminModules/DisplayExecutive";
import CreateNotice from "../pages/AdminPage/CreateNotice";
import TopPerformers from "../pages/AdminPage/TopPerformers";
import NoticeComPerf from "../pages/AdminPage/NoticeComPerf";
import DisplayNotice from "../pages/AdminPage/DisplayNotice"; //Display notice
import EditNotices from "../pages/AdminPage/EditNotices"; //edit notices
import PayrollPage from "../pages/PayrollPage/PayrollPage";
import CreatePayroll from "../modules/AdminModules/CreatePayroll";
import DisplayPayroll from "../modules/AdminModules/DisplayPayroll";
import EditPayroll from "../modules/AdminModules/EditPayroll";
import LapReport from "../pages/AdminPage/LapAlloReport";
import ManagerReview from "../modules/AdminModules/ManagerReview";
import EditManagerReview from "../modules/AdminModules/ManagerReview";
import DirectorReview from "../modules/AdminModules/DirectorReview";
import EditDirectorReview from "../modules/AdminModules/DirectorReview";
import PartnerReview from "../modules/AdminModules/PartnerReview";
import EditPartnerReview from "../modules/AdminModules/PartnerReview";
import AllReports from "../pages/AdminPage/AllReports";
import CreateReport from "../pages/AdminPage/CreateReport";
import Quarter_Performance from "../pages/AdminPage/Quarter_Performance";
import Report from "../pages/AdminPage/CreateReport";
import UpdateReport from "../pages/AdminPage/UpdateReport";
import EditLaptopRepair from "../modules/AdminModules/EditLaptopRepair";
import CreateLaptopRepair from "../modules/AdminModules/CreateLaptopRepair";
import LaptopsRepair from "../pages/AdminPage/LaptopRepair";
import PostLaptopRepair from "../modules/AdminModules/PostLaptopRepair";
import LaptopPage from "../pages/LaptopPage/LaptopPage";
import CreateLaptop from "../modules/AdminModules/CreateLaptop";
import EditLaptopInventory from "../modules/AdminModules/EditLaptopInventory";
import PostLaptop from "../modules/AdminModules/PostLaptop";

import CreateClient from "../modules/AdminModules/CreateClient";
import DisplayClient from "../modules/AdminModules/DisplayClient";
import EditClient from "../modules/AdminModules/EditClient";
import ClientsRoutesPage from "../pages/ClientsRoutesPage/ClientsRoutesPage";

import ProfilePage from "../modules/AdminModules/ProfilePage";
import CreateProfile from "../modules/AdminModules/CreateProfile";
import EditProfile from "../modules/AdminModules/EditProfile";
import DisplayProfile from "../modules/AdminModules/DisplayProfile";

import AdminAttendance from "../pages/AdminPage/AdminAttendance";
import CreateAttendance from "../modules/AdminModules/CreateAttendance";
import EditAttendance from "../modules/AdminModules/EditAttendance";

import MonthlySalary from "../pages/AdminPage/MonthlySalary";
import CreateMSalary from "../modules/AdminModules/CreateMSalary";
import EditMSalary from "../modules/AdminModules/EditMSalary";

import EmployeePoints from "../pages/AdminPage/EmployeePoints";
import AllEmployees from "../pages/AdminPage/AllEmployees";
import InsertEmployee from "../pages/AdminPage/InsertEmployee";
import EditEmployee from "../pages/AdminPage/EditEmployee";
import PendingAssignment from "../pages/AdminPage/PendingAssignment";
import CompletedAssignment from "../pages/AdminPage/CompletedAssignment";
import EmployeeReport from "../modules/AdminModules/EmployeeReport";
import EmpReportUpload from "../modules/AdminModules/EmpReportUpload";
import EmpExportReport from "../modules/AdminModules/EmplExportReport";
import EmpReportEdit from "../modules/AdminModules/EmpReportEdit";
import EmpProfile from "../modules/AdminModules/EmpProfile";
import Notices from "../pages/AdminPage/Notices";

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
        <Route
          exact
          path="/editassignment/:assignment"
          component={EditAssignment}
        />
        <Route exact path="/employeereport" component={EmployeeReport} />
        <Route exact path="/empreportupload" component={EmpReportUpload} />
        <Route exact path="/empreportedit/:id" component={EmpReportEdit} />
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
        <Route path="/lapalloreport" component={LapReport} exact />
        <Route path="/InsertEmployee" component={InsertEmployee} exact />
        /*Anujitha Routes*/
        <Route
          path="/quarterperformance"
          component={Quarter_Performance}
          exact
        />
        <Route path="/reports/:id" component={CreateReport} exact />
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
          exact
          path="/CompletedAssignments/:id"
          component={CompletedAssignment}
        />
        <Route exact path="/empexportreport" component={EmpExportReport} />
        <Route exact path="/empprofile/:id" component={EmpProfile} />
        <Route
          path="/displayexecutive/:id"
          component={DisplayExecutive}
          exact
        />
        /*Senara Routes*/
        <Route path="/CreateNotice" component={CreateNotice} exact></Route>
        <Route path="/TopPerformers" component={TopPerformers} exact></Route>
        <Route path="/NoticeComPerf" component={NoticeComPerf} exact></Route>
        /*Dimashi Routes*/
        <Route path="/allpayrolls" component={PayrollPage} exact />
        <Route path="/addpayroll" exact component={CreatePayroll}></Route>
        <Route path="/displaypayroll/:id" component={DisplayPayroll} exact />
        <Route path="/editpayroll/:id" component={EditPayroll} exact />
        <Route path="/allattendance" component={AdminAttendance} exact />
        <Route path="/addattendance" exact component={CreateAttendance}></Route>
        <Route path="/editattendance/:id" component={EditAttendance} exact />
        <Route path="/allsalary" component={MonthlySalary} exact />
        <Route path="/addsalary" component={CreateMSalary} exact />
        <Route path="/editsalary/:id" component={EditMSalary} exact />
        /*Sajini*/
        <Route path="/laptop" exact component={LaptopPage}></Route>
        <Route path="/createlaptop" component={CreateLaptop} exact />
        <Route path="/editlaptop/:id" component={EditLaptopInventory} exact />
        <Route path="/viewlaptop/:id" component={PostLaptop} exact />
        <Route path="/repairinglaptop" exact component={LaptopsRepair}></Route>
        <Route
          path="/createlaptoprepair"
          exact
          component={CreateLaptopRepair}
        ></Route>
        <Route
          path="/editrepair/:id"
          exact
          component={EditLaptopRepair}
        ></Route>
        <Route
          path="/viewrepair/:id"
          exact
          component={PostLaptopRepair}
        ></Route>
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
        //Senara Routes
        <Route
          path="/EditNotices/:existingNotices"
          component={EditNotices}
          exact
        ></Route>
        <Route path="/AdminTab5" component={Notices} exact></Route>
        <Route
          path="/DisplayNotice/:existingNotices"
          component={DisplayNotice}
          exact
        ></Route>
        //Anujitha Update
        <Route
          path="/UpdateReport/:finalreport"
          component={UpdateReport}
          exact
        ></Route>
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default AppRoutes;
