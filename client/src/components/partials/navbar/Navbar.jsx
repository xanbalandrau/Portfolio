import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../logoutButton";
import { useAuth } from "../../../context/AuthContext";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import "./NavBar.css";

const NavBar = () => {
  const { user, isAdmin } = useAuth();
  const [expand, updateExpanded] = useState(false);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className="navbar"
      data-bs-theme="dark"
    >
      <Container>
        <NavbarBrand>
          <Link to="/" onClick={() => updateExpanded(false)}>
            <img
              className="logo d-inline-block align-top "
              src="/portfolio-professionnel.png"
              alt="logo"
            />
          </Link>
        </NavbarBrand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span className="navbar-toggler-icon "></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            {user ? (
              <>
                <Nav.Item>
                  <Link to="/portfolio" onClick={() => updateExpanded(false)}>
                    Portfolio
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/dashboardUser"
                    onClick={() => updateExpanded(false)}
                  >
                    Dashboard
                  </Link>
                </Nav.Item>
                {isAdmin ? (
                  <Nav.Item>
                    <Link to="/dashboard" onClick={() => updateExpanded(false)}>
                      Dashboard Admin
                    </Link>
                  </Nav.Item>
                ) : (
                  ""
                )}
                <Nav.Item>
                  <LogoutButton />
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Link to="/register" onClick={() => updateExpanded(false)}>
                    Register
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/login" onClick={() => updateExpanded(false)}>
                    Login
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
