import React from "react";
import "./styles.css";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../services/api";
import CardFlip from "../../components/Card";

export default function ListRegions() {

  const [updateData, setUpdateData] = useState(true);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (updateData) {
      getRegions();
      setUpdateData(false);      
    }
  }, [updateData]);

  const getRegions = async () => {
    await api.get("api/region").then((response) => {
      setRegions(response.data);
    });
  };

  return (
    <div>
      <div className="container-body">
        <div className="region-list">
          <Row xs={1} md={3} className="g-4 region-list-cards">
            <Col>
              {regions.map((region) => (
                <CardFlip key={region.id} values={region} />
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
