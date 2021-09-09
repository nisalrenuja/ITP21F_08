//...
import "./SideNav.css";

const SideNav = ({ selectedMenuOption, onMenuItemSelect }) => {
  const menuItems = [
    "User Executive",
    "Reports Management",
    "Employees",
    "Work Allocation",
    "Notice Management",
    "Attendance & Payroll",
    "Inventory Management",
    "Clients"
  ];
  return (
    <div className="sideNavbar">
      <div className="menuItemContainer">
        <div className="heading">Admin Panel</div>
        {menuItems.map((menuOption, index) => (
          <div
            key={index}
            onClick={onMenuItemSelect.bind(this, menuOption)}
            className={`button ${
              selectedMenuOption === menuOption
                ? "button-selected"
                : "button-deselected"
            }`}
          >
            {menuOption}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
