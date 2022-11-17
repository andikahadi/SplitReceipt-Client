import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import SignUp from "../components/Signup";
import Redirect, { useNavigate } from "react-router-dom";
import { SettingsInputAntenna } from "@mui/icons-material";
import { GoogleAuth } from "../components/GoogleAuth";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface AccountProps {
  loggedInUser: {
    email: string | null | undefined;
  };
  handleCreateList: (input: any) => void;
}

interface UserInfoInterface {
  email: string;
  username: string;
  is_admin: boolean;
  last_email_fetch: string;
}

export const Account: React.FC<AccountProps> = ({
  loggedInUser,
  handleCreateList,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoInterface>({
    email: "",
    username: "",
    is_admin: false,
    last_email_fetch: "",
  });
  const [tempState, setTempState] = useState();

  const nav = useNavigate();
  const handleConnect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    axiosInstance.get("splitwise/").then((res) => {
      console.log(res.data);
      const url = res.data["url"];
      const secret = res.data["secret"];
      localStorage.setItem("splitwise_secret", secret);
      window.open(url, "_self");
    });
  };

  // const handleClickGet = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   // let oauth_token = localStorage.getItem("oauth_token");
  //   // let oauth_token_secret = localStorage.getItem("oauth_token_secret");

  //   let splitwise_access_token = JSON.parse(
  //     localStorage.getItem("splitwise_access_token")
  //   );

  //   axiosInstance
  //     .post("splitwise-friend/", splitwise_access_token)
  //     .then((res) => {
  //       handleUserFriendsChange(res.data);
  //     });
  // };
  useEffect(() => {
    let email = localStorage.getItem("split_receipt_email");
    axiosInstance
      .post("user-read/", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setUserInfo({
          email: res.data.email,
          username: res.data.user_name,
          is_admin: res.data.is_admin,
          last_email_fetch: res.data.last_email_fetch,
        });
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          nav("/login");
        }
      });
  }, []);

  return (
    <>
      {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Get splitwise friend list
      </Button> */}

      <Card sx={{ minWidth: 275, mt: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 5, mt: 0 }}>
            Hi there, {userInfo?.username} !
          </Typography>

          <Typography variant="body1">
            1. Connect to Gmail account to GrabFood receipt
          </Typography>

          <GoogleAuth
            userInfo={userInfo}
            loggedInUser={loggedInUser}
            handleCreateList={handleCreateList}
          />
          <Typography variant="body1" sx={{ mt: 4 }}>
            2. Connect to Splitwise account to start assigning your receipt
          </Typography>
          {localStorage.getItem("splitwise_access_token") && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleConnect}
              color="success"
            >
              Connected to Splitwise &#x2713;
            </Button>
          )}
          {!localStorage.getItem("splitwise_access_token") && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleConnect}
            >
              Connect to Splitwise
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
};
