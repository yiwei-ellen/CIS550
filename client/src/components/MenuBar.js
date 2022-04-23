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
            <Navbar type="light" theme="info" expand="md">
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
                Households
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/visuals" >
                Facts and Visuals
              </NavLink>
            </NavItem>
          </Nav>
          
      </Navbar>
        )
    }
}

export default MenuBar
