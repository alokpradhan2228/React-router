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
