import React, { useState } from "react";
import {
  authService,
  enrollUserEmailAndPassword,
  signInAuth,
  googleProvider,
} from "../firebase";
import {
  setPersistence,
  signInWithPopup,
  browserLocalPersistence,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
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
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    if (name === "google") {
      let provider = googleProvider;
      await signInWithPopup(authService, provider);
    }
  };
  return (
    <div>
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
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
      {error}
    </div>
  );
};

export default Auth;
