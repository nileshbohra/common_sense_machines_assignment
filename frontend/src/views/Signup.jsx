import React from "react";
import { Link } from "react-router-dom";
import { signup } from "../controllers/auth.controller";

export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    signup(data, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">FirstName</label>
        <input type="text" id="firstName" name="firstName" />
        <label htmlFor="lastName">LastName</label>
        <input type="text" id="lastName" name="lastName" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="password">Confirm Password</label>
        <input type="password" id="password_confirm" name="password_confirm" />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have a account, <Link to="/login">login</Link> instead.
      </p>
    </>
  );
}
