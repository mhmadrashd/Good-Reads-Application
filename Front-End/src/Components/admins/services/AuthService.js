import axios from "axios";

const AuthFetch = {
  login: (user) => {
    return axios.post("https://goodread-backend.herokuapp.com/admin/login", user, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then((res) => {
        const resJson = res.json();
        // console.log(resJson);
        // console.log("test")
        return resJson;
      })
      .catch((err) => console.log(err));
  },
};
export default AuthFetch;
