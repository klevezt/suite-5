import React from "react";

const UsersContent = ({user}) => {
  return (
    <div className="card col-6 mb-3">
      <div className="card-body">
        <h5 className="card-title">ID: {user.id}</h5>
        <p className="card-text">Name: {user.name}</p>
        <p className="card-text">Email: {user.email}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Gender: {user.gender}</li>
        <li className="list-group-item">Status: {user.status}</li>
      </ul>
    </div>
  );
};

export default UsersContent;
