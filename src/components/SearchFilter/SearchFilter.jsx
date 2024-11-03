import { useState, useEffect } from "react";
import axios from "axios";

const SearchFilter = ({ setResults }) => {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    material: "",
    location: "",
    year: "",
  });

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ads", { params: filters });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/ads", { params: filters });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select name="type" value={filters.type} onChange={handleInputChange}>
          <option value="">All</option>
          <option value="Boat">Boat</option>
          <option value="Trailer">Trailer</option>
        </select>
      </label>

      <label>
        Min Price:
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Max Price:
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Material:
        <select
          name="material"
          value={filters.material}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="GRP">GRP</option>
          <option value="Wood">Wood</option>
          <option value="Aluminium">Aluminium</option>
          <option value="Steel">Steel</option>
        </select>
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Year:
        <input
          type="number"
          name="year"
          value={filters.year}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchFilter;
