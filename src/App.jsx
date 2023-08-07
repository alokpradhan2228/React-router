import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import EditUserForm from "./EditUserForm";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSaveUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route
          path="/edit/:userId"
          element={
            <EditUserForm
              onSave={handleSaveUser}
              onCancel={() => window.history.back()}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
