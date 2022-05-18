import React, { useContext, useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../store/context";
import { useNavigate } from "react-router-dom";
// import "~mdb-ui-kit/css/mdb.min.css";
// import * as mdb from "mdb-ui-kit"; // lib
// import { Input } from "mdb-ui-kit"; // module

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
  });
  return (
    <section className="text-center gradient">
      {/* <!-- BackgroundImage --> */}
      <div className="p-5 bg-image Background"></div>

      <div className="card mx-4 mx-md-5 shadow-5-strong Shadow"></div>

      <div className="card-body   ">
        <div className="row d-flex justify-content-center login">
          <div className="col-lg-8">
            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}

            <div className="container">
              <h2 className="fw-bold mb-5 fwForm">Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="row card  formEdit">
                  <div className="col mb-4">
                    <div className="form-outline btnlogin mb-3 button">
                      <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        className="button"
                        placeholder="username"
                      />
                      <br />
                    </div>

                    <div className="col-5 btnlogin ">
                      <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="button"
                        placeholder="password"
                      />
                    </div>
                    <br />
                    {/* <!-- Checkbox --> */}
                    <div className="form-check d-flex justify-content-center mb-4 btnlogin button">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example33"
                      />
                      <label className="form-check-label btnlogin button">
                        Remember Me
                      </label>
                    </div>
                    <a href="/" style={{ color: "#555555" }}>
                      Forget it?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
