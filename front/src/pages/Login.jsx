import React from "react";
import Form from "../components/Form";

const Login = () => {
  return (
    <div className="container my-5">
      <Form route="/api/accounts/login/" method="login" />
    </div>
  );
};

export default Login;
