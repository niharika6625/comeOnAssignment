import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./login.css";
import { ROUTE_PATH } from "../../helper/constants";

const { CASINO } = ROUTE_PATH;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.removeItem("auth");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(
          "auth",
          JSON.stringify({
            username: formData.username,
            ...data.player,
          })
        );
        navigate(CASINO);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      }).validate(formData, { abortEarly: false });

      await handleLogin();
    } catch (validationErrors) {
      const errors = validationErrors.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(errors);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login" style={{ display: "block" }}>
      <div className="ui grid centered">
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <i className="user icon"></i>
              </div>
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <i className="lock icon"></i>
              </div>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            {error && <div className="ui error message">{error}</div>}
            <div className="field">
              <div className="ui icon input">
                <button type="submit" disabled={isSubmitting} class="login-button">
                  <span>{isSubmitting ? "Logging in..." : "Login"}</span>
                  <i class="right chevron icon"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
