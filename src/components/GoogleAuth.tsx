import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Google } from "@mui/icons-material";

interface GoogleAuthProps {}

const CLIENT_ID =
  "1021304219474-kffnfs7t3c0hh09g6sbs4kq1fg8djr43.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/gmail.readonly";

export const GoogleAuth: React.FC<GoogleAuthProps> = ({}) => {
  // const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);

  // const handleGoogleSignIn = (res) => {
  //   if (!res.clientId || !res.credential) return;
  //   console.log("JWT: " + res.credential);

  //   // Implement your login mutations and logic here.
  //   // Set cookies, call your backend, etc.
  // };

  // useEffect(() => {
  //   const initializeGsi = () => {
  //     // Typescript will complain about window.google
  //     // Add types to your `react-app-env.d.ts` or //@ts-ignore it.
  //     if (!window.google || gsiScriptLoaded) {
  //       console.log("script is loaded");
  //       return;
  //     }

  //     setGsiScriptLoaded(true);
  //     window.google.accounts.id.initialize({
  //       client_id:
  //         "1021304219474-kffnfs7t3c0hh09g6sbs4kq1fg8djr43.apps.googleusercontent.com",
  //       callback: handleGoogleSignIn,
  //     });
  //   };
  //   const script = document.createElement("script");
  //   script.src = "https://accounts.google.com/gsi/client";
  //   script.onload = initializeGsi;
  //   script.async = true;
  //   script.id = "google-client-script";
  //   document.querySelector("body")?.appendChild(script);

  //   return () => {
  //     // Cleanup function that runs when component unmounts
  //     window.google?.accounts.id.cancel();
  //     document.getElementById("google-client-script")?.remove();
  //   };
  // }, []);

  const [user, setUser] = useState({});
  const [tokenClient, setTokenClient] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  function createDriveFile() {
    tokenClient.requestAccessToken();
  }
  useEffect(() => {
    /*Global Google*/

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    // window.google.accounts.id.prompt();

    // Access Tokens

    // tokenClient
    setTokenClient(
      window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPE,
        callback: (tokenResponse) => {
          console.log(tokenResponse);
          // We now have access to a live token to use for any google API
          // if (tokenResponse && tokenResponse.access_token) {
          //   fetch();
          // }
        },
      })
    );
    // tokenClient.requestAccessToken()
  }, []);

  return (
    <>
      <div id="signInDiv"></div>
      {/* <Button className={"g_id_signin"} /> */}
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
          <input type="submit" onClick={createDriveFile} value="Create File" />
        </div>
      )}
    </>
  );
};
