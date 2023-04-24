import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${username}`
      );
      setUsers(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="App">
      <h1>Github User Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a Github username"
          value={username}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt="User Avatar" />
            <div className="user-info">
              <h3>{user.login}</h3>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
