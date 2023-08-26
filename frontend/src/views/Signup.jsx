import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signup } from "../controllers/auth.controller";

export default function Signup() {
  const navigate = useNavigate();
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
        alert(err.response.data.status);
      } else {
        alert("Signup successful");
        navigate(`/login`);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="card p-10">
          <div className="card-body">
            <h1 className="card-title">Sign Up</h1>
            <form onSubmit={handleSubmit} className="p-10">
              <div className="flex justify-evenly gap-4">
                <div className="form-group flex-grow">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                  />
                </div>
                <div className="form-group flex-grow">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  className="form-control"
                />
              </div>
              <button
                style={{ backgroundColor: "#2a9d8f" }}
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Sign Up
                <i className="material-icons right">send</i>
              </button>
            </form>
            <p>
              Already have a account,{" "}
              <Link to="/login" style={{ color: "blue" }}>
                login
              </Link>{" "}
              instead.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
