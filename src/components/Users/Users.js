import React, { useEffect, useState } from "react";
import UsersContent from "./UsersContent";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();
    setIsLoading(true);

    const exec = async () => {
      const result = await fetch("https://gorest.co.in/public/v2/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());
      setIsLoading(false);

      setUsers(result);
    };
    exec();

    controller = null;
    return () => controller?.abort();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="row">
          {users.map((user, i) => (
            <UsersContent key={i} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default Users;
