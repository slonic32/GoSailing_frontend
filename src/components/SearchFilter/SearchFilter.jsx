import { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Grid, Button } from "@mui/material";

const SearchFilter = ({ setResults }) => {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    material: "",
    location: "",
    year: "",
  });

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [yearSuggestions, setYearSuggestions] = useState([]);

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

  const fetchSuggestions = async (query, field, setter) => {
    try {
      if (!query.trim()) {
        setter([]);
        return;
      }
      const response = await axios.get("/ads/autocomplete", {
        params: { query, field },
      });
      setter(response.data.map((item) => item[field]));
    } catch (error) {
      console.error(`Error fetching ${field} suggestions:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" wrap="nowrap">
        {/* Type Filter */}
        <Grid item>
          <label htmlFor="type">Type:</label>
          <TextField
            select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            SelectProps={{ native: true }}
            size="small"
            variant="outlined"
          >
            <option value="">All</option>
            <option value="Boat">Boat</option>
            <option value="Trailer">Trailer</option>
          </TextField>
        </Grid>

        {/* Min Price Filter */}
        <Grid item>
          <label htmlFor="minPrice">Min Price:</label>
          <TextField
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            size="small"
            variant="outlined"
          />
        </Grid>

        {/* Max Price Filter */}
        <Grid item>
          <label htmlFor="maxPrice">Max Price:</label>
          <TextField
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            size="small"
            variant="outlined"
          />
        </Grid>

        {/* Material Filter */}
        <Grid item>
          <label htmlFor="material">Material:</label>
          <TextField
            select
            id="material"
            name="material"
            value={filters.material}
            onChange={handleInputChange}
            SelectProps={{ native: true }}
            size="small"
            variant="outlined"
          >
            <option value="">All</option>
            <option value="GRP">GRP</option>
            <option value="Wood">Wood</option>
            <option value="Aluminium">Aluminium</option>
            <option value="Steel">Steel</option>
          </TextField>
        </Grid>

        {/* Location Filter with Autocomplete */}
        <Grid item>
          <label htmlFor="location">Location:</label>
          <Autocomplete
            freeSolo
            options={locationSuggestions}
            onInputChange={(e, value) => {
              setFilters({ ...filters, location: value });
              fetchSuggestions(value, "location", setLocationSuggestions);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="location"
                name="location"
                variant="outlined"
                size="small"
                style={{ width: "150px" }} // Compact width
              />
            )}
          />
        </Grid>

        {/* Year Filter with Autocomplete */}
        <Grid item>
          <label htmlFor="year">Year:</label>
          <Autocomplete
            freeSolo
            options={yearSuggestions}
            onInputChange={(e, value) => {
              setFilters({ ...filters, year: value });
              fetchSuggestions(value, "year", setYearSuggestions);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="year"
                name="year"
                variant="outlined"
                size="small"
                style={{ width: "100px" }} // Compact width
              />
            )}
          />
        </Grid>

        {/* Search Button */}
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchFilter;
