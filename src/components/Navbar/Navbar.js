import React, { Component } from "react";
import { Nav, Navbar }from 'react-bootstrap';
import { Link, BrowserRouter as Router } from "react-router-dom";

const navbar = props => (
  <Router>
    <Navbar justify variant="tabs" className="justify-content-center" bg="dark" variant="dark" fixed="bottom" >
      <Nav variant="pills" defaultActiveKey="Rooms">
      <Nav.Item>
        <Nav.Link href="/rooms">Rooms</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/speakers">Speakers</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/times">Time Slots</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/presentations">Presentations</Nav.Link>
      </Nav.Item>
      </Nav>
    </Navbar>
  </Router>

);

export default navbar;