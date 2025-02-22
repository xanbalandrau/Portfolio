import { Link } from "react-router-dom";
import LogoutButton from "../../logoutButton";

const Navbar = () => {
  return (
    <div>
      <Link to={"/"}>h</Link>
      <Link to={"/register"}>r</Link>
      <Link to={"/login"}>l</Link>
      <Link to={"/portfolio"}>p</Link>
      <Link to={"/dashboardUser"}>du</Link>
      <Link to={"/dashboard"}>d</Link>
      <LogoutButton />
    </div>
  );
};

export default Navbar;
