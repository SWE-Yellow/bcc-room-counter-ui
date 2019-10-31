import React from "react";
import { Nav, Navbar }from 'react-bootstrap';
import { withRouter } from "react-router";
import './Navbar.css';

const navbar = props => (
  <Navbar justify className="justify-content-center" bg="dark" variant="dark" fixed="bottom" >
    <Nav variant="pills" defaultActiveKey="/Rooms" activeKey={props.location.pathname}>
      <Nav.Item>
        <Nav.Link eventKey="/Rooms" exact href='/Rooms'>Rooms</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/Speakers" exact href='/Speakers'>Speakers</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/Times" exact href='/Times'>Time Slots</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/Presentations" exact href='/Presentations'>Presentations</Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
);

export default withRouter(navbar);