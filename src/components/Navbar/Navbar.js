import React, { Component } from "react";
import { Nav, Navbar }from 'react-bootstrap';
import { Link, BrowserRouter as Router } from "react-router-dom";

const navbar = props => (
  <Router>
    <Navbar justify variant="tabs" className="justify-content-center" bg="dark" variant="dark" fixed="bottom" >
      <Nav variant="pills" defaultActiveKey="Rooms">
        <Nav.Item>
          <Nav.Link eventKey="Rooms" exact to="../Rooms">Rooms</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Speakers" to="../Speakers">Speakers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Times" to="../Times">Time Slots</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Presentations" to="Presentations">Presentations</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Router>

);

export default navbar;