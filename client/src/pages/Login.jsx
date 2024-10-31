import React from "react";

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
