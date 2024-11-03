import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Type</th>
              <th>Material</th>
              <th>Price</th>
              <th>Location</th>
              <th>Year</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {results.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.model}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.material}</td>
                <td>{vehicle.price}</td>
                <td>{vehicle.location}</td>
                <td>{vehicle.year}</td>
                <td>
                  <Link to={`/${vehicle.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vehicles found</p>
      )}
    </div>
  );
};

export default SearchResults;
