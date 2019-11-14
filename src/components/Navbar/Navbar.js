import React from "react";
import { Nav, Navbar, Button }from 'react-bootstrap';
import { withRouter } from "react-router";
import fire from '../fire';
import './Navbar.css';

const navbar = props => (
  <Navbar justify className="justify-content-center" bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Navbar.Brand> Boston Code Camp Counter</Navbar.Brand>
    </Nav>
    <Nav className="mr-auto" variant="pills" defaultActiveKey="/Rooms" activeKey={props.location.pathname}>
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
    <Nav className="mr-right">
      <Button variant="outline-info" href='/Login' onClick={() => fire.auth().signOut()}>Log Out</Button>
    </Nav>
  </Navbar>
);

export default withRouter(navbar);