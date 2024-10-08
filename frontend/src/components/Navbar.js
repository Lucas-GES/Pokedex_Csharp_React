import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import pokeicon from "../assets/pokeicon.png";

export default function Pokemons() {

  return (
    <>
      <Navbar className="fixed-top" data-bs-theme="dark" bg="danger">
        <Container fluid>          
          <Nav>
            <Navbar.Brand href="/"><img src={pokeicon} alt="pokeicon" style={{height: "25px", width: "25px", marginRight: "5px"}} />Pokedex</Navbar.Brand>            
            <NavDropdown title="Pokemons" id="basic-nav-dropdown" bg="danger">
              <NavDropdown.Item href="/pokemons">List</NavDropdown.Item>
              <NavDropdown.Item href="/pokemons/new/0">Add New</NavDropdown.Item>              
            </NavDropdown>            
            <NavDropdown title="Regions" id="basic-nav-dropdown" bg="danger">
              <NavDropdown.Item href="/regions">List</NavDropdown.Item>
              <NavDropdown.Item href="/regions/new/0">Add New</NavDropdown.Item>              
            </NavDropdown>
            <Nav.Link onClick={window['changeImage']}>Day/Night</Nav.Link>
          </Nav>        
          <Nav>
            <Nav.Link href="#home">Logout</Nav.Link>
          </Nav>           
        </Container>
      </Navbar>
    </>
  );
}
