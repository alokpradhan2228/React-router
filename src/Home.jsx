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
