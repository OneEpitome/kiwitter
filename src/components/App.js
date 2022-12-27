import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService, observerOfAuthState } from "../firebase";

function App() {
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    observerOfAuthState(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing ..."
      )}
      <footer>&copy; Kiwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
