import React from "react";

export default function Signup() {
  return (
    <>
      <form>
        <label htmlFor="firstName">FirstName</label>
        <input type="text" id="firstName" name="firstName" />
        <label htmlFor="lastName">LastName</label>
        <input type="text" id="lastName" name="lastName" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="password">Confirm Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Signup</button>
      </form>
    </>
  );
}
