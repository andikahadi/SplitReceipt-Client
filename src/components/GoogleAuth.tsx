import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Google } from "@mui/icons-material";
import axiosInstance from "../axios";

interface GoogleAuthProps {
  loggedInUser: {
    email: string | null | undefined;
  };
  handleCreateList: (input: any) => void;
}

const CLIENT_ID =
  "1021304219474-kffnfs7t3c0hh09g6sbs4kq1fg8djr43.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/gmail.readonly";

export const GoogleAuth: React.FC<GoogleAuthProps> = ({
  loggedInUser,
  handleCreateList,
}) => {
  const [user, setUser] = useState({});
  const [tokenClient, setTokenClient] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  // function handleSignOut(event) {
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // }

  function accessEmailInbox() {
    tokenClient.requestAccessToken();
    axiosInstance;
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
          axiosInstance
            .post("gmail-receipt/", {
              access_token: tokenResponse["access_token"],
              email: loggedInUser["email"],
            })
            .then((res) => {
              console.log("getting receipt from gmail inbox");
              axiosInstance
                .post("get-receipt/", {
                  email: loggedInUser["email"],
                  is_assigned: false,
                })
                .then((res) => {
                  console.log(res);
                  handleCreateList(res.data);
                });
            });
        },
      })
    );
    // tokenClient.requestAccessToken()
  }, []);

  return (
    <>
      {/* <p>{JSON.stringify(loggedInUser)}</p> */}
      <div id="signInDiv"></div>
      {/* <Button className={"g_id_signin"} /> */}
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
          <input
            type="submit"
            onClick={accessEmailInbox}
            value="Access Email Inbox"
          />
        </div>
      )}
    </>
  );
};
