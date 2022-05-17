import React, { useContext, useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../store/context";
import { useNavigate } from "react-router-dom";
// // import Stack from '@mui/material/Stack';
// // import Button from "@mui/material/Button";
// import Button, { ButtonProps } from "@mui/material/Button";
// import { purple } from "@mui/material/colors";
// import { styled } from "@mui/material/styles";
// // import Stack from "@mui/material/Stack";

import "./Login.css";

const Login = (props) => {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, resetForm } = LoginForm(submit);
  const setCurrentUserInfo = useContext(AuthContext);

  //update
  function updateMessage(newValue) {
    props.loginMessage(newValue);
  }
  async function submit(values) {
    try {
      const response = await AuthService.login(values);
      const { isAuthenticated, message } = response;

      if (isAuthenticated) {
        setCurrentUserInfo({
          type: "LOGIN",
          payload: response,
        });

        const message = { msgBody: "Welcome to GoodrReads App" };
        updateMessage(message);
        navigate("/userpage");
      } else updateMessage(message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    resetForm();
  }, []);

  // const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //   color: theme.palette.getContrastText(purple[500]),
  //   backgroundColor: purple[500],
  //   '&:hover': {
  //     backgroundColor: purple[700],
  //   },
  // }));

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-5">
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              className="login-input"
              placeholder="username"
            />

            <br />
          </div>
          <div className="col-5">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="login-input"
              placeholder="password"
            />

            <br />
            <span style={{ color: "#555555" }}>
              <input type="checkbox" />
              Remember Me
            </span>
            <a href="/" style={{ color: "#555555" }}>
              Forget it?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
