import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";

export default function NewEditRegion() {
  const { region } = useParams();

  const [regionId, setRegionId] = useState(0);
  const [name, setName] = useState("");
  const [image, setRegionImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const [updateData, setUpdateData] = useState(true);


  const history = useNavigate();

  useEffect(() => {
    if (updateData) {
      if (region === '0') {
        return;
      } else {
        loadRegions();
      }
      setUpdateData(false);
    }
  }, [updateData]);

  async function loadRegions() {
    try {
      const response = await api.get(`api/region/${region}`);
      setRegionId(response.data.id);
      setName(response.data.name);
      setImageName(response.data.image);
    } catch (error) {
      alert("Error loading pokemon " + error);
      history("/regions");
    }
  }

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
          history("/regions");
      } catch (error) {
        alert('Error on uploading image ' + error);
      }
    }

    const data = {
      name
    }

    data.image = imageName;

    try {
      if(region === '0') 
      {
        await api.post('api/region', data)
      }
      else
      {
        data.id = regionId;
        await api.put(`api/region/${regionId}`, data);
      }
      history('/regions');
    } catch (error) {
      alert('Error on saving the region ' + error);
      console.log(error)
    }
  };

  async function UploadImage(e) {
    setRegionImage(e.target.files[0]);
    setImageName(Date.now() + e.target.files[0].name);
  }

  async function deleteRegion(id) {
    try {
      await api.delete(`api/region/${id}`);
      history("/regions");
    } catch (error) {
      alert("Error deleting region!");
    }
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
           {region === '0' ? 'Add New Region:' : `Update ${name}`} 
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
            {region === '0' ? 'Submit' : 'Update'}
          </Button>
          <Button style={{ width: "inherit" }} variant="danger" className="mt-3" onClick={(e) => deleteRegion(region)}>
            Delete
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
