import { useState } from "react";
import axios from "axios";

export default function AddPowerboatPage() {
  const [model, setModel] = useState("");
  const [material, setMaterial] = useState("GRP");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [length, setLength] = useState("");
  const [beam, setBeam] = useState("");
  const [engine, setEngine] = useState("OutBoard");
  const [power, setPower] = useState("");
  const [engineType, setEngineType] = useState("Diesel");
  const [speed, setSpeed] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      model,
      type: "Boat",
      material,
      price,
      location,
      year,
      description,
      photo,
    };
    const boatData = { category: "PowerBoat", length, beam, engine, power };
    const powerBoatData = { engineType, speed };

    try {
      const res = await axios.post("/ads/powerboats", {
        ...vehicleData,
        ...boatData,
        ...powerBoatData,
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error adding powerboat:", error);
    }
  };

  return (
    <div>
      <h1>Add Powerboat</h1>
      <form onSubmit={handleSubmit}>
        {/* Vehicle Fields */}
        <div>
          <label>Model: </label>
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Material: </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="GRP">GRP</option>
            <option value="Wood">Wood</option>
            <option value="Aluminium">Aluminium</option>
            <option value="Steel">Steel</option>
          </select>
        </div>

        <div>
          <label>Price: </label>
          <input
            type="number"
            placeholder="Price, euro"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Location: </label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Year: </label>
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description: </label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Photo URL: </label>
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <div>
          <label>Length: </label>
          <input
            type="number"
            placeholder="Length, m"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div>
          <label>Beam: </label>
          <input
            type="number"
            placeholder="beam, m"
            value={beam}
            onChange={(e) => setBeam(e.target.value)}
          />
        </div>

        <div>
          <label>Engine Type: </label>
          <select value={engine} onChange={(e) => setEngine(e.target.value)}>
            <option value="OutBoard">Outboard engine</option>
            <option value="InBoard">Inboard engine</option>
            <option value="No">No engine</option>
          </select>
        </div>

        <div>
          <label>Engine Power: </label>
          <input
            type="number"
            placeholder="power, hp"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </div>

        <div>
          <label>Engine Fuel: </label>
          <select
            value={engineType}
            onChange={(e) => setEngineType(e.target.value)}
          >
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Gas">Gas</option>
          </select>
        </div>
        <div>
          <label>Maximum Speed: </label>
          <input
            type="number"
            placeholder="Speed, km / h"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Powerboat</button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}