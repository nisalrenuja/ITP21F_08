import "./SideNav.css";

const SideNav = ({ selectedMenuOption, onMenuItemSelect }) => {
  const menuItems = [
    "Report Review",
    "MenuItem 2",
    "Employees",
    "Work Allocation",
    "Notice Management",
    "Attendance & Payroll",
    "Inventory Managemnet",
    "MenuItem 8"
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
