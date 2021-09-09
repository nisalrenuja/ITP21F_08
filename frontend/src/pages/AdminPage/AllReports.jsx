import { React, useEffect, useState } from "react";
import Container from "../../component/Admin/common/Container";
import SideNav from "../../component/Admin/common/SideNav";
import AdminTab1 from "../../modules/AdminModules/AdminTab1";
import AdminTab2 from "../../modules/AdminModules/AdminTab2";
import AdminTab3 from "../../modules/AdminModules/AdminTab3";
import AdminTab4 from "../../modules/AdminModules/AdminTab4";
import AdminTab5 from "../../modules/AdminModules/AdminTab5";
import AdminTab6 from "../../modules/AdminModules/AdminTab6";
import AdminTab7 from "../../modules/AdminModules/AdminTab7";
import AdminTab8 from "../../modules/AdminModules/AdminTab8";
import LapAllo from "../../modules/AdminModules/LapAllo";
import CompanyPerfomance from "../../modules/AdminModules/CompanyPerformance";

const Admin = () => {
  let userRole = "";
  let selectedMenuOptionCache = "";
  if (process.browser) {
    userRole = window.localStorage.getItem("Role") || "";
    selectedMenuOptionCache =
      window.localStorage.getItem("MenuOptionCache") || "";
  }
  const [selectedMenuOption, setSelectedMenuOption] = useState(
    "User Executive"
  );

  useEffect(() => {
    if (userRole !== "Admin") {
      setSelectedMenuOption("Events");
    }
  }, [userRole]);

  useEffect(() => {
    if (selectedMenuOptionCache !== "") {
      setSelectedMenuOption(selectedMenuOptionCache);
    }
  }, [selectedMenuOptionCache]);

  const updateSelectedMenuOption = option => {
    setSelectedMenuOption(option);
    if (process.browser) {
      window.localStorage.setItem("MenuOptionCache", option);
    }
  };

  return (
    <div>
      {selectedMenuOption !== "" ? (
        <Container>
          {selectedMenuOption === "User Executive" ? (
            <AdminTab1 />
          ) : selectedMenuOption === "Reports Management" ? (
            <AdminTab2 />
          ) : selectedMenuOption === "MenuItem 3" ? (
            <AdminTab3 />
          ) : selectedMenuOption === "Work Allocation" ? (
            <AdminTab4 />
          ) : selectedMenuOption === "MenuItem 5" ? (
            <AdminTab5 />
          ) : selectedMenuOption === "Attendance & Payroll" ? (
            <AdminTab6 />
          ) : selectedMenuOption === "MenuItem 7" ? (
            <AdminTab7 />
          ) : (
            <AdminTab8 />
          )}
        </Container>
      ) : (
        <div> </div>
      )}
      <SideNav
        onMenuItemSelect={updateSelectedMenuOption}
        selectedMenuOption={selectedMenuOption}
      />
    </div>
  );
};

export default Admin;
