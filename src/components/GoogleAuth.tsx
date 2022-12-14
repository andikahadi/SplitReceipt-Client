import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Google } from "@mui/icons-material";
import axiosInstance from "../axios";

interface GoogleAuthProps {
  loggedInUser: {
    email: string | null | undefined;
  };
  handleCreateList: (input: any) => void;
  userInfo: {
    email: string;
    username: string;
    is_admin: boolean;
    last_email_fetch: string;
  };
}

interface FetchTimeDisplayInterface {
  last_fetch_time: Date;
}
const CLIENT_ID =
  "1021304219474-kffnfs7t3c0hh09g6sbs4kq1fg8djr43.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/gmail.readonly";

export const GoogleAuth: React.FC<GoogleAuthProps> = ({
  loggedInUser,
  handleCreateList,
  userInfo,
  setTempState,
}) => {
  const [user, setUser] = useState({});
  const [tokenClient, setTokenClient] = useState({});
  const [fetchTimeDisplay, setFetchTimeDisplay] =
    useState<FetchTimeDisplayInterface>();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

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
  }, []);

  return (
    <>
      {user && (
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={accessEmailInbox}
          >
            Get Receipt from Gmail
          </Button>
          <Typography variant="body1" color="text.secondary">
            Last email fetch: {userInfo?.last_email_fetch}
          </Typography>
        </div>
      )}
    </>
  );
};
