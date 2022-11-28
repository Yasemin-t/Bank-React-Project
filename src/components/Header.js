import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import banks from "../images/banks.jpg";

function Header() {
  // MODAL OPEN FONKSSİYONU
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && (
        <Navbar>
          <NavbarBrand href="/">
            <img className="logo" src={banks} />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/bankadd/">Banka Ekle</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/hesaplama">Hesaplama</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </div>
  );
}

export default Header;
