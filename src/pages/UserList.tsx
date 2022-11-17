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
      <h1>User List</h1>
      {userList.length && (
        <Row>
          {userList.map((d, i) => {
            return (
              <Card>
                {/* <Card.Header>a</Card.Header> */}
                <Card.Body>
                  <Card.Title>Username: {d["user_name"]}</Card.Title>
                  <Card.Text>Email : {d.email}</Card.Text>
                  <Card.Text>Join Date : {d.date_joined}</Card.Text>
                  <Card.Text>Last Login : {d.last_login}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleUserDelete(d, i);
                    }}
                  >
                    Delete User
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      )}
    </>
  );
};
