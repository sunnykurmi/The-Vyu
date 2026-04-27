import { useEffect, useState } from "react";

const validateCredentials = (password) => {
  return password === "robbreporter@123";
};

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    const password = prompt("Please enter your password:");
    if (password === null) return;

    if (validateCredentials(password)) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please try again.");
      handleAuthentication();
    }
  };

  const checkAuthentication = () => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (!authStatus) {
      handleAuthentication();
    }
  };

  useEffect(() => {
    checkAuthentication();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isAuthenticated) {
        checkAuthentication();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated]);

  return isAuthenticated;
};

export default useAuthentication;
