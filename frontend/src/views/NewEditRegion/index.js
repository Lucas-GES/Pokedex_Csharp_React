import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles.css";
import api from "../../services/api";

export default function NewEditRegion() {
  const [regionId, setRegionId] = useState(0);
  const [name, setName] = useState("");
  const [image, setRegionImage] = useState();
  const [imageName, setImageName] = useState("");

  async function sendRegion(e) {
    e.preventDefault();
    if (image !== null) {
      const regionImage = new FormData();
      regionImage.append("Image", image);
      regionImage.append("ImageName", imageName);
      try {
        await api.post('api/region/upload',
          regionImage,
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
      image: imageName,
    }

    console.log(data);
    try {
      const res = await api.post('api/region', data);
      console.log(res);
    } catch (error) {
      alert('Error on saving the region ' + error);
      console.log(error)
    }
  };

  async function UploadImage(e) {
    setRegionImage(e.target.files[0]);
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
        onSubmit={sendRegion}
      >
        <Form.Group
          style={{ width: "300px", margin: "18px auto" }}
          controlId="sendPokemons"
        >
          <h3 style={{ textAlign: "center", margin: "20px" }}>
            Add New Region:
          </h3>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Region Name:"
            value={name}
            onChange={e => setName(e.target.value)}
          />          

          <Form.Control
            className="mb-3"
            type="file"
            placeholder="Region Image:"
            onChange={UploadImage}
          />

          <Button style={{ width: "inherit" }} variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
