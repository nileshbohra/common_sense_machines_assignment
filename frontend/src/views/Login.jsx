import React from "react";
import { login } from "../controllers/auth.controller";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    login(data);
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
        Don't have a account? <a href="/signup">signup</a> instead.
      </p>
    </>
  );
}
