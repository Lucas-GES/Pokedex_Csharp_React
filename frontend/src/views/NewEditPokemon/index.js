import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles.css";
import api from "../../services/api";

export default function NewEditPokemon() {
  const [pokeId, setPokeId] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [moves, setMoves] = useState("");
  const [image, setPokeImage] = useState();
  const [imageName, setImageName] = useState("");
  const [regionId, setRegionId] = useState();

  async function sendPokes(e) {
    e.preventDefault();
    if (image !== null) {
      const pokeImage = new FormData();
      pokeImage.append("Image", image);
      pokeImage.append("ImageName", imageName);
      try {
        await api.post('api/pokemon/upload',
          pokeImage,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
      } catch (error) {
        console.log(error)
        alert('Error on uploading image ' + error);
      }
    }

    const data = {
      name,
      type,
      moves,
      imageName,
      regionId,
    }

    console.log(data);
    try {
      const res = await api.post('api/pokemon', data);
      console.log(res);
    } catch (error) {
      alert('Error on saving pokemon ' + error);
    }
  };

  async function UploadImage(e) {
    setPokeImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  }

  return (
    <div className="formData">
      <Form
        style={{
          height: "400px",
          width: "400px",
          backgroundColor: "white",
          justifyContent: "center",
          borderRadius: "10px",
        }}
        onSubmit={sendPokes}
      >
        <Form.Group
          style={{ width: "300px", margin: "18px auto" }}
          controlId="sendPokemons"
        >
          <h3 style={{ textAlign: "center", margin: "20px" }}>
            Add New Pokemon:
          </h3>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Pokemon Name:"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Type:"
            value={type}
            onChange={e => setType(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Moves:"
            value={moves}
            onChange={e => setMoves(e.target.value)}
          />

          <Form.Control
            className="mb-3"
            type="file"
            placeholder="Pokemon Image:"
            onChange={UploadImage}
          />

          <Form.Select className="mb-3" aria-label="Region" value={regionId} onChange={e => setRegionId(e.target.value)}>
            <option>Select Region:</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="6">Five</option>
          </Form.Select>
          <Button style={{ width: "inherit" }} variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
