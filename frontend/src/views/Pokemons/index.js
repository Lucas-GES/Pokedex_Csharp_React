import "../Pokemons/styles.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import pokedex from "../../assets/pokedex-list.png";

export default function Pokemons() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand href="#home">Pokedex</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">All Pokemons</Nav.Link>
              <Nav.Link href="#link">Regions</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="pokedex">
        <img src={pokedex} alt="Pokedex" />
      </div>
    </>
  );
}
