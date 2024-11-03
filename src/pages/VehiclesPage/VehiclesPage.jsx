import { useEffect, useState } from "react";
import axios from "axios";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import SearchResults from "../../components/SearchResults/SearchResults";

export default function VehiclesPage() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <div>
        <p>Buy or Sell Your Boat!</p>
        <h1>GoSailing</h1>
      </div>
      <h2>All Vehicles</h2>
      <SearchFilter setResults={setResults}></SearchFilter>
      <SearchResults results={results}></SearchResults>
    </div>
  );
}
