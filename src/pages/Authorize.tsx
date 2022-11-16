import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

interface AuthorizeProps {}

export const Authorize: React.FC<AuthorizeProps> = ({}) => {
  let nav = useNavigate();
  useEffect(() => {
    let callbackUrl = window.location.href;
    console.log(callbackUrl);

    let secret = localStorage.getItem("splitwise_secret");
    axiosInstance
      .post("splitwise/", {
        callbackUrl: callbackUrl,
        secret: secret,
      })
      .then((res) => {
        // console.log(res.data);
        // console.log("Splitwise oauth token:");
        // console.log(res.data["oauth_token"]);
        // console.log("Splitwise oauth token secret:");
        // console.log(res.data["oauth_token_secret"]);
        // localStorage.setItem("oauth_token", res.data["oauth_token"]);
        // localStorage.setItem(
        //   "oauth_token_secret",
        //   res.data["oauth_token_secret"]
        // );
        localStorage.setItem(
          "splitwise_access_token",
          JSON.stringify(res.data)
        );
      });
    nav("/account");
  }, []);

  return <p>authorize</p>;
};
