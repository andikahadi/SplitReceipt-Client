import { Button } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../axios";
import SignIn from "../components/Signin";
import SignUp from "../components/Signup";
import Redirect, { useNavigate } from "react-router-dom";
import { SettingsInputAntenna } from "@mui/icons-material";

interface AccountProps {}

export const Account: React.FC<AccountProps> = ({}) => {
  const [userFriends, setUserFriends] = useState([]);
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

  const handleClickGet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let oauth_token = localStorage.getItem("oauth_token");
    let oauth_token_secret = localStorage.getItem("oauth_token_secret");
    axiosInstance
      .post("splitwise-friend/", {
        oauth_token: oauth_token,
        oauth_token_secret: oauth_token_secret,
      })
      .then((res) => {
        setUserFriends(res.data);
      });
  };

  return (
    <>
      <p>{JSON.stringify(userFriends)}</p>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleConnect}
      >
        Connect to Splitwise
      </Button>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickGet}
      >
        Get splitwise friend list
      </Button>
    </>
  );
};
