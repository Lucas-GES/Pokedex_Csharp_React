import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";

export default function NewEditPokemon() {
  const { pokemonId } = useParams();

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [moves, setMoves] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [image, setPokeImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [regionId, setRegionId] = useState();
  const [regions, setRegions] = useState([]);

  const [updateData, setUpdateData] = useState(true);

  const history = useNavigate();

  useEffect(() => {
    if (updateData) {
      loadRegions();
      if (pokemonId === '0') {
        return;
      } else {
        loadPokemons();
      }
      setUpdateData(false);
    }
  }, [updateData]);

  async function loadPokemons() {
    try {
      const response = await api.get(`api/pokemon/${pokemonId}`);
      setId(response.data.id);
      setName(response.data.name);
      setType(response.data.type);
      setMoves(response.data.moves);
      setWeight(response.data.weight);
      setHeight(response.data.height);
      setRegionId(response.data.regionId);
      setImageName(response.data.imageName);
    } catch (error) {
      alert("Error loading pokemon " + error);
      history("/pokemons");
    }
  }

  async function loadRegions() {
    try {
      api.get("api/region").then((response) => {
        setRegions(response.data);
      });
    } catch (error) {
      alert("Error loading regions " + error);
    }
  }

  async function sendPokes(e) {
    e.preventDefault();
    if (image !== null) {
      const pokeImage = new FormData();
      pokeImage.append("Image", image);
      pokeImage.append("ImageName", imageName);
      try {
        await api.post("api/pokemon/upload", pokeImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        history("/pokemons");
      } catch (error) {
        alert("Error on uploading image " + error);
      }
    }

    const data = {
      name,
      type,
      moves,
      weight,
      height,
      imageName,
      regionId,
    };

    try {
      if (pokemonId === '0') {
        await api.post("api/pokemon", data);
      }
      else {
        data.id = id;
        await api.put(`api/pokemon/${id}`, data);
      }
      history("/pokemons");
    } catch (error) {
      alert("Error on saving pokemon " + error);
    }
  }

  async function UploadImage(e) {
    setPokeImage(e.target.files[0]);
    setImageName(Date.now() + e.target.files[0].name);
  }

  async function deletePoke(id) {
    try {
      await api.delete(`api/pokemon/${id}`);
      history("/pokemons");
    } catch (error) {
      alert("Error deleting pokemon!");
    }
  }

  return (
    <div className="formData">
      <Form
        style={{
          height: "570px",
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
            {pokemonId === '0' ? "Add New Pokemon:" : `Update ${name}`}
          </h3>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Pokemon Name:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Type:"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="number"
            placeholder="Weight:"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="number"
            placeholder="Height:"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Moves:"
            value={moves}
            onChange={(e) => setMoves(e.target.value)}
          />

          {pokemonId === '0' ?
            <Form.Control
              className="mb-3"
              type="file"
              placeholder="Pokemon Image:"
              onChange={UploadImage}
              required
            />
            :
            <Form.Control
              className="mb-3"
              type="file"
              placeholder={imageName}
              onChange={UploadImage}
            />
          }

          <Form.Select
            className="mb-3"
            aria-label="Region"
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
          >
            <option>Select Region:</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </Form.Select>
          <Button style={{ width: "inherit" }} className="mb-3" variant="primary" type="submit">
            {pokemonId === '0' ? "Add" : "Update"}
          </Button>
          {
            pokemonId === '0' ?
              '' :

              <Button style={{ width: "inherit" }} variant="danger" className="mb-3" onClick={(e) => deletePoke(pokemonId)}>
                Delete
              </Button>
          }
        </Form.Group>
      </Form>
    </div>
  );
}
