import React from "react";
import Users from "./Components/Users";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../API_Functions/APIs";

function ViewAllUsers() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <div className="text-center mt-5 h4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-5 h4">Error fetching users</div>;
  }

  const users = data?.data || [];

  return (
    <>
      <h1 className="text-center">All Users</h1>

      {users.length > 0 ? (
        users.map((user) => (
          <Users
            key={user._id} 
            username={user.uName}
            userId={user._id}
            dob={new Date(user.uDOB).toLocaleDateString()}
            dateOfRegistration={new Date(
              user.uDateofRegistration
            ).toLocaleDateString()}
            mobileNo={user.uContactNumber}
            email={user.uEmail}
            address={user.uAddress}
          />
        ))
      ) : (
        <p>No users found</p>
      )}
    </>
  );
}

export default ViewAllUsers;
