import React from "react";
import { Container, Navbar as NavbarBs, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to={"/"} as={NavLink}>
            List
          </Nav.Link>
          <Nav.Link to={"/history"} as={NavLink}>
            History
          </Nav.Link>
          <Nav.Link to={"/account"} as={NavLink}>
            Account
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
};
