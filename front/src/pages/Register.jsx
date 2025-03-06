import Form from "../components/Form";
import React from "react";

const Register = () => {
  return (
    <div className="container my-5">
      <Form route="/api/accounts/register/" method="register" />
    </div>
  );
};

export default Register;
