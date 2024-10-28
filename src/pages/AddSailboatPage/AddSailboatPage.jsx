import { useState } from "react";
import axios from "axios";

export default function AddSailboatPage() {
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
  const [mastHeight, setMastHeight] = useState("");
  const [sailArea, setSailArea] = useState("");
  const [draught, setDraught] = useState("");
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
    const boatData = { category: "SailBoat", length, beam, engine, power };
    const sailBoatData = { mastHeight, sailArea, draught };

    try {
      const res = await axios.post("/ads/sailboats", {
        ...vehicleData,
        ...boatData,
        ...sailBoatData,
      });
      setResponse(res.data);
    } catch (error) {
      setResponse(error.response.data);
    }
  };

  return (
    <div>
      <h1>Add Sailboat</h1>
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
          <label>Mast Height: </label>
          <input
            type="number"
            placeholder="Mast Height, m"
            value={mastHeight}
            onChange={(e) => setMastHeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sail Area: </label>
          <input
            type="number"
            placeholder="Sail Area, sq. m."
            value={sailArea}
            onChange={(e) => setSailArea(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Draught: </label>
          <input
            type="number"
            placeholder="Draught, m"
            value={draught}
            onChange={(e) => setDraught(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Sailboat</button>
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
