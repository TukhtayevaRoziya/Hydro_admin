import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import icon from "./icon.png";
// import { Navbar, Button, NavbarToggler, Collapse } from "reactstrap";

const Topbar = ({ toggleSidebar }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => {
    setTopbarOpen(!topbarIsOpen);
  };
  const LogOut = () => {
    window.localStorage.clear();
    window.location.reload(true);
    return <Navigate to={"/login"} />;
  };

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <img src={icon} alt="" className="icon" />
      <NavbarToggler onClick={toggleTopbar} />

      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color={"danger"} onClick={LogOut}>
              Chiqish
            </Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
