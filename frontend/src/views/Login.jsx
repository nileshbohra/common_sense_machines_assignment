import React from "react";
import { login } from "../controllers/auth.controller";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(data, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        navigate(`/gallery/${data.user._id}`);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have a account? <Link to="/signup">signup</Link> instead.
      </p>
    </>
  );
}
