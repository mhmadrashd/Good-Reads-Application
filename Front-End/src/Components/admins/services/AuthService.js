const AuthFetch = {
  login: (user) => {
    return fetch("http://localhost:3000/admin/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
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
