import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
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
              <NavDropdown.Item href="#action/3.2">Add New</NavDropdown.Item>              
            </NavDropdown>
            <Nav.Link href="#link">Regions</Nav.Link>
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
