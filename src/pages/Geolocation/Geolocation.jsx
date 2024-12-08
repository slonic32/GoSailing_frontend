import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { BACKEND_HOST } from "../../redux/auth/operations";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
//axios.defaults.baseURL = BACKEND_HOST;

export default function Geolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customIp, setCustomIp] = useState("");

  async function getGeolocation() {
    try {
      const response = await axios.get("/users/geolocation");
      console.log("geo: ", response.data);

      return response.data;
    } catch (error) {
      console.log("geoerror: ", error);
      //    console.error("Error fetching geolocation:", error);
      return null;
    }
  }

  async function lookupCustomIp() {
    const response = await axios.get(`https://ipinfo.io/${customIp}/geo`);
    const { loc, ip } = response.data;
    if (!loc || !ip) {
      setLocation(null);
    }
    const [latitude, longitude] = loc.split(",");
    setLocation({ latitude, longitude, ip });
  }

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      const data = await getGeolocation();
      if (data) {
        setLocation(data);
      }
      setLoading(false);
    };
    getLocation();
  }, []);

  return (
    <div>
      <Link to={`/`}>Back to vehicle list</Link>
      <input
        type="text"
        placeholder="Enter custom IP"
        value={customIp}
        onChange={(e) => setCustomIp(e.target.value)}
      />
      <button onClick={lookupCustomIp}>Lookup</button>;
      {location && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              <strong>IP:</strong> {location.ip}
              <br />
              <strong>Coordinates:</strong> {location.latitude},{" "}
              {location.longitude}
            </Popup>
          </Marker>
        </MapContainer>
      )}
      {loading && (
        <div>
          Loading map...
          <Loader />
        </div>
      )}
      {!location && <div>Unable to load location data. Please try again.</div>}
    </div>
  );
}
