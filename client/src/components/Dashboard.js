import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { getDetail } from "../helper/user";

const Dashboard = () => {
  const [getData, setData] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("username") && !sessionStorage.getItem("id") && !sessionStorage.getItem("token")) {
      window.location.href = "/";
    }
    const data = {
      username: sessionStorage.getItem("username"),
      token: sessionStorage.getItem("token"),
    };
    getDetail("http://localhost:3001/users/detail", data).then((result) => {
      setData(result.data);
    });
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Welcome Back, {getData.fullname}!!</h1>
        <ul>
          <li>Full Name: {getData.fullname}</li>
          <li>Phone: 0{getData.phone}</li>
          <li>Notes: {getData.note}</li>
        </ul>
      </Container>
    </div>
  );
};

export default Dashboard;
