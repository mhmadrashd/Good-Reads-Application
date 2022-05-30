import React, { useContext, useEffect } from "react";
import LoginForm from "./LoginForm";
import { AuthContext } from "../../store/context";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Login.css";
import { setloginState } from "../../../../Redux/DataSlice";
import { useDispatch } from "react-redux";


const Login = (props) => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values, resetForm } = LoginForm(submit);
  const setCurrentUserInfo = useContext(AuthContext);
  const dispatch = useDispatch();
  async function submit(values) {
    try {

      await axios.post(`https://goodread-backend.herokuapp.com/admin/login`, values, {
        headers: {
          token: sessionStorage.getItem("Authorization")
        }
      })
        .then((response) => {
          dispatch(setloginState(true));
          sessionStorage.setItem("loginState", true)
          // console.log(response.data)
          // document.cookie = `Authorization=${response.data.Authorization};maxAge: 24 * 60 * 60 * 1000`
          sessionStorage.setItem("Authorization", response.data.Authorization);
          navigate("/admin/dashboard");
          // console.log(response)
          // console.log("Done")
          // console.log(sessionStorage.getItem("Authorization"))
        }).catch((error) => {
          console.log(error)
        })
    }
    catch (error) {
      console.log(error);
    }
    // try {
    // const response = await AuthService.login(values);
    //   const { isAuthenticated, message } = response;

    //   if (isAuthenticated) {
    //     setCurrentUserInfo({
    //       type: "LOGIN",
    //       payload: response,
    //     });

    //     const message = { msgBody: "Welcome to GoodrReads App" };
    //     updateMessage(message);
    //     navigate("/userpage");
    //   } else updateMessage(message);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  useEffect(() => {
    resetForm();
  }, []);
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
              <h2 className="fw-bold mb-5 fwForm">Welcome To Admin Panel</h2>

              <form onSubmit={handleSubmit} className="form">
                <div className="row card  formEdit ">
                  <div className="col mb-4 ">
                    <div className="form-outline btnlogin mb-3">
                      <input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="button"
                        placeholder="email"
                        autoComplete="off"
                      />

                      <br />
                    </div>

                    <div className="form-outline btnlogin mb-3 ">
                      <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="button"
                        placeholder="password"
                        autoComplete="off"
                      />

                    </div>

                    <div className="form-outline btnlogin mb-3">
                      <input
                        type="submit"
                        value="Sign in"
                        className="gr-button gr-button--dark login-btn Currbtn"
                      />
                    </div>
                    <br />
                    {/* <!-- Checkbox --> */}
                    <div className="form-check d-flex justify-content-center mb-4 btnlogin button">
                      <input
                        className="form-check-input me-2 mt-3"
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
