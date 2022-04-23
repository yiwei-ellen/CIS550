import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="light" theme="primary" expand="md" style="background-color: #e3f2fd;">
        <NavbarBrand href="/">National Crime Victimization Survey</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/persons">
                Persons
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/households" >
                Persons
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
