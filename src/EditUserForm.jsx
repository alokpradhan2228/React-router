import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUserForm = ({ users, onSave, onCancel }) => {
  const { userId } = useParams();

  const user = users.find((user) => user.id === parseInt(userId));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
    });
  }, [user]);

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
