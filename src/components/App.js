import AppRouter from "./Router";
import React, { useEffect } from "react";
import { authService, observerOfAuthState } from "../firebase";

function App() {
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  useEffect(() => {
    observerOfAuthState(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing ..."}
      <footer>&copy; Kiwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
