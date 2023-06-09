import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { LoginInputs } from "../types";
import { AuthContext, AuthContextType } from "../context/authContext";

export const Login = () => {
  const [inputs, setInputs] = React.useState<LoginInputs>({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  console.log(authContext?.currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await authContext?.login(inputs);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};
