import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./login.css";
import { ROUTE_PATH, API_PATH } from "../../helper/constants";
import fetchData from '../../services/api.js';
const { CASINO } = ROUTE_PATH;
const { LOGIN_API } =  API_PATH;
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
    fetchData(LOGIN_API, 'POST', formData).then(async(res) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          username: formData.username,
          ...res.data.player,
        })
      );
      navigate(CASINO);
    }).catch(async(err) => {
      setIsSubmitting(false);
      setError(err.response.data.error);
    })
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
                <button type="submit" disabled={isSubmitting} className="login-button">
                  <span>{isSubmitting ? "Logging in..." : "Login"}</span>
                  <i className="right chevron icon"></i>
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
