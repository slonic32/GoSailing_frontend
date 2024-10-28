import { useState } from "react";
import axios from "axios";

export default function AddTrailerPage() {
  const [model, setModel] = useState("");

  const [material, setMaterial] = useState("Aluminium");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [payload, setPayload] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      model,
      type: "Trailer",
      material,
      price,
      location,
      year,
      description,
      photo,
    };

    const trailerData = {
      payload,
    };

    try {
      // Send a POST request to the backend to add a new trailer
      const res = await axios.post("/ads/trailers", {
        ...vehicleData,
        ...trailerData,
      });
      setResponse(res.data);
    } catch (error) {
      setResponse(error.response.data);
    }
  };

  return (
    <div>
      <h1>Add Trailer</h1>
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

        {/* Trailer Field */}
        <div>
          <label>Payload: </label>
          <input
            type="number"
            placeholder="Payload, kg"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Trailer</button>
      </form>

      {response && (
        <div>
          <h2>Response from Backend:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
