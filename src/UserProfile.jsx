import React from 'react'

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
   <div style={{padding: "40px"}}>
    <h2>My profile</h2>
    <p><stong>Name:</stong> {user.fullName}</p>
    <p><strong>Email:</strong>{user.email}</p>
    <p><strong>Role:</strong>{user.role}</p>
   </div>
  );
}

export default UserProfile