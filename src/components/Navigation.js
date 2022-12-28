import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService } from "../firebase";

const Navigation = () => {
  const onSignOut = async () => {
    await signOut(authService);
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <button onClick={onSignOut}>Sign out</button>
      </nav>
    </>
  );
};

export default Navigation;
