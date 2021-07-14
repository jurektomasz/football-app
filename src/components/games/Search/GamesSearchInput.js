import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const GamesSearchInput = () => {
  const [location, setLocation] = useState("");
  const history = useHistory();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    location ? history.push(`/games/search/${location}`) : history.push("/");
  };

  return (
    <div className="input-group input-group--search mx-auto">
      <input
        onKeyPress={handleKeyPress}
        onChange={(e) => setLocation(e.target.value)}
        className="form-control form-control--search"
        type="search"
        placeholder="Where Do You Want Football To Go Today?"
      />
      <div className="input-group-append">
        <button onClick={handleSearch} className="btn btn-info" type="submit">
          Search
        </button>
      </div>
    </div>
  );
};

export default GamesSearchInput;
