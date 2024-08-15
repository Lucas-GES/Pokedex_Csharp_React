import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <Navbar className="fixed-bottom" data-bs-theme="dark" bg="danger">
        <Container fluid>          
          <Nav>            
            <br />
          </Nav>
          <Nav><p style={{color: "whitesmoke"}}>© 2024 Pokedex - All rights reserved</p></Nav>        
          <Nav>
            <br />
          </Nav>           
        </Container>
      </Navbar>
    </>
  )
}
