import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfiguratorContainer = (props) => {
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/segments");
      const data = await response.json();
      console.log("Fetched segments:", data);
      setSegments(data);
    } catch (error) {
      console.error("Error fetching segments:", error);
    }
  };

  const fetchManufacturers = async (segmentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/manufacturers/${segmentId}`);
      const data = await response.json();
      console.log("Fetched manufacturers:", data);
      setManufacturers(data);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const fetchModels = async (segmentId, manufacturerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${segmentId}/${manufacturerId}`);
      const data = await response.json();
      console.log("Fetched models:", data);
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleSegmentChange = (event) => {
    const segmentId = event.target.value;
    setSelectedSegment(segmentId);
    setSelectedManufacturer("");
    setManufacturers([]);
    setModels([]);

    if (segmentId) {
      fetchManufacturers(segmentId);
    }
  };

  const handleManufacturerChange = (event) => {
    const manufacturerId = event.target.value;
    setSelectedManufacturer(manufacturerId);
    setModels([]);

    if (selectedSegment && manufacturerId) {
      fetchModels(selectedSegment, manufacturerId);
    }
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleGoButtonClick = () => {
    if (selectedModel && selectedSegment && selectedManufacturer) {
      navigate(`/DefaultConfig/${selectedModel}/${quantity}`);
    }
  };

  return (
    <div id="configurator" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Configure here</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <h3>Segment</h3>
            <select
              className="custom-select"
              value={selectedSegment}
              onChange={handleSegmentChange}
            >
              <option value="">Select Segment</option>
              {segments?.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`col-xs-12 col-md-3 ${
              selectedSegment ? "" : "disabled"
            }`}
          >
            <h3>Manufacturer</h3>
            <select
              className="custom-select"
              value={selectedManufacturer}
              onChange={handleManufacturerChange}
              disabled={!selectedSegment}
            >
              <option value="">Select Manufacturer</option>
              {manufacturers?.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`col-xs-12 col-md-3 ${
              selectedManufacturer ? "" : "disabled"
            }`}
          >
            <h3>Model</h3>
            <select
              className="custom-select"
              value={selectedModel}
              onChange={handleModelChange}
              disabled={!selectedManufacturer}
            >
              <option value="">Select Model</option>
              {models?.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.modName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-xs-12 col-md-3" style={{ width: "15%" }}>
            <h3>Quantity</h3>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="col-xs-12 col-md-3">
            <button
              className="btn1"
              style={{ marginLeft: "45%" }}
              onClick={handleGoButtonClick}
              disabled={!selectedModel}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorContainer;
