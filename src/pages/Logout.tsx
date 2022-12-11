import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const Logout = () => {
  const auth = getAuth();
  useEffect(() => {
    if (auth) {
      auth.signOut();
    }
  }, []);

  return <div></div>;
};

export { Logout };
