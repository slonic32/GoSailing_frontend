import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`/ads/${id}`);
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchVehicle();
  }, [id]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <Link to={`/`}>Back to vehicle list</Link>
      <h1>{vehicle.model}</h1>
      <p>Type: {vehicle.type}</p>
      <p>Material: {vehicle.material}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Location: {vehicle.location}</p>
      <p>Description: {vehicle.description}</p>
      {/* Additional fields  */}
      {vehicle.type === "Trailer" && <p>Payload: {vehicle.payload}</p>}
      {vehicle.type === "Boat" && (
        <>
          <p>Category: {vehicle.category}</p>
          <p>Length: {vehicle.length}</p>
          <p>Beam: {vehicle.beam}</p>
          <p>Engine: {vehicle.engine}</p>
          <p>Power: {vehicle.power}</p>
          {vehicle.category === "SailBoat" && (
            <>
              <p>MastHeight: {vehicle.mastHeight}</p>
              <p>SailArea: {vehicle.sailArea}</p>
              <p>Draught: {vehicle.draught}</p>
            </>
          )}
          {vehicle.category === "PowerBoat" && (
            <>
              <p>EngineType: {vehicle.engineType}</p>
              <p>Speed: {vehicle.speed}</p>
            </>
          )}
          {vehicle.category === "Inflatable" && (
            <>
              <p>Persons: {vehicle.persons}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VehicleDetail;
