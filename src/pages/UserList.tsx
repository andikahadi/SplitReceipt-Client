import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Button, Card } from "react-bootstrap";

interface UserListProps {}

export const UserList: React.FC<UserListProps> = ({}) => {
  const [userList, setUserList] = useState([]);
  const nav = useNavigate();

  const handleUserDelete = (data, index) => {
    if (localStorage.getItem("admin_role")) {
      console.log(data);
      setUserList((prevEntry) => {
        const arr = [...prevEntry];
        const filtered = arr.filter((d, i) => i !== index);
        return filtered;
      });

      axiosInstance
        .post("user-delete/", {
          user_id: data.id,
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      alert("You don't have permission");
    }
  };

  useEffect(() => {
    axiosInstance.get("user-read/").then((res) => {
      console.log(res.data);
      setUserList(res.data);
    });
  }, []);

  return (
    <>
      {userList.length && (
        <Row>
          <Card style={{ padding: "0.5rem" }}>
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Card.Text
                style={{ fontSize: "0.8rem", width: "20%", margin: 0 }}
              >
                User
              </Card.Text>
              <Card.Text
                style={{ fontSize: "0.8rem", width: "30%", margin: 0 }}
              >
                Email
              </Card.Text>
              <Card.Text
                style={{ fontSize: "0.8rem", width: "22%", margin: 0 }}
              >
                Join Date
              </Card.Text>
              <Card.Text
                style={{
                  width: "24%",
                }}
              ></Card.Text>
            </Card.Body>
          </Card>
          {userList.map((d, i) => {
            return (
              <Card style={{ padding: "0.5rem" }}>
                <Card.Body
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 0,
                  }}
                >
                  <Card.Text
                    style={{ fontSize: "0.8rem", width: "20%", margin: 0 }}
                  >
                    {d["user_name"]}
                  </Card.Text>
                  <Card.Text
                    style={{ fontSize: "0.8rem", width: "30%", margin: 0 }}
                  >
                    {d.email}
                  </Card.Text>
                  <Card.Text
                    style={{ fontSize: "0.8rem", width: "22%", margin: 0 }}
                  >
                    {d.date_joined.slice(0, -14)}
                  </Card.Text>
                  <div style={{ width: "24%" }}>
                    <Button
                      style={{
                        maxWidth: "100px",
                        maxHeight: "30px",
                        minWidth: "90px",
                        minHeight: "20px",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                      variant="primary"
                      onClick={() => {
                        handleUserDelete(d, i);
                      }}
                    >
                      Delete User
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      )}
    </>
  );
};
