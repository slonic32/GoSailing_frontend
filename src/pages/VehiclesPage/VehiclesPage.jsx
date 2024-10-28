import { useEffect, useState } from "react";
import axios from "axios";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("/ads");
        setVehicles(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <div>
        <p>Buy or Sell Your Boat!</p>
        <h1>GoSailing</h1>
      </div>
      <h2>All Vehicles</h2>
      {vehicles.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Type</th>
              <th>Material</th>
              <th>Price</th>
              <th>Location</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.model}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.material}</td>
                <td>{vehicle.price}</td>
                <td>{vehicle.location}</td>
                <td>{vehicle.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vehicles found</p>
      )}
    </div>
  );
}
