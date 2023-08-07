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
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="card" key={user.id}>
      <h2>User {user.id}</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>
        Address: {user.address.city}, {user.address.street}
      </p>
      <Link to={`/edit/${user.id}`}>
        <button className="edit-btn">Edit</button>
      </Link>
    </div>
  );
};

export default UserCard;
import React, { useState } from "react";

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: user.id });
  };

  return (
    <div className="container">
      <h2>Edit User {user?.id}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </label>
        <input type="submit" value="Save" />
        <button className="back-btn" onClick={onCancel}>
          Back
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
import React from "react";
import UserCard from "./UserCard";

const Home = ({ users }) => {
  return (
    <div className="container">
      <h1>JSON Placeholder</h1>
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default Home;