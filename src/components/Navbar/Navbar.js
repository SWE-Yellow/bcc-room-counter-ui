import React, { Component } from "react";
import { Nav, Navbar }from 'react-bootstrap';

const navbar = props => (
  <Navbar justify variant="tabs" className="justify-content-center" bg="dark" variant="dark" fixed="bottom" >
    <Nav variant="pills" defaultActiveKey="/rooms">
      <Nav.Item>
        <Nav.Link href="/rooms">Rooms</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/speakers">Speakers</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/times">Time Slots</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/presentations">Presentations</Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>

);

export default navbar;