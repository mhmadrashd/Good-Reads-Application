const AuthFetch = {
  login: (user) => {
    return fetch("http://localhost:5000/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const resJson = res.json();
        console.log(resJson);
        return resJson;
      })
      .catch((err) => console.log(err));
  },
};
export default AuthFetch;
