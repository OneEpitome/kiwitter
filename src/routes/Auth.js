import React, { useState } from "react";
import { authService, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [error, setError] = useState("");
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
      <AuthForm setError={setError} />
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
