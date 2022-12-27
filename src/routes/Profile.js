import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
