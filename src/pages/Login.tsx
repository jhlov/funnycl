import { EmailAuthProvider, getAuth } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./Login.scss";

const Login = () => {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    // signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/funnycl/admin"
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: (authResult: any, redirectUrl?: string) => {
    //     console.log(authResult, redirectUrl);
    //     console.log(getAuth().currentUser);
    //     return false;
    //   }
    // }
  };

  return (
    <div className="login">
      <h1 className="mb-3">퍼니클</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
};

export { Login };
