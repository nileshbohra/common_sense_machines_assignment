import React from "react";
import { login } from "../controllers/auth.controller";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(data, (err, data) => {
      if (!!err) {
        toast.error(err.response.data.status);
      } else {
        toast.success("Login Success");
        navigate(`/gallery/${data.user._id}`);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="card p-10">
          <div className="card-body">
            <h1 className="card-title">Login</h1>
            <form onSubmit={handleSubmit} className="p-10">
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
              <button
                style={{ backgroundColor: "#2a9d8f" }}
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login
                <i className="material-icons right">send</i>
              </button>
            </form>
            <p>
              Don't have a account?{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                signup
              </Link>{" "}
              instead.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
