import { browserLocalPersistence, setPersistence } from "firebase/auth";
import React, { useState } from "react";
import {
  authService,
  enrollUserEmailAndPassword,
  signInAuth,
} from "../firebase";

const AuthForm = ({ setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // create Account
        await enrollUserEmailAndPassword(authService, email, password);
      } else {
        // log in
        await setPersistence(authService, browserLocalPersistence);
        await signInAuth(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="email"
          placeholder="Email"
          required
          value={email}
          name="email"
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
          value={password}
          name="password"
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        <span onClick={toggleAccount}>
          {newAccount ? "Create Account" : "Sign In"}
        </span>
      </form>
    </>
  );
};

export default AuthForm;
