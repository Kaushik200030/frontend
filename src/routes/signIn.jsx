import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { login, signup } from "../utils/user";

const Authentication = () => {
  console.log("Authentication");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/posts");
    }
  }, [navigate]);

  return (
    <div className="w-full min-h-screen p-32">
      <div>
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default Authentication;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { token, user } = await login(username, password);
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location = "/posts";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="w-full p-32">
      <div className="text-center max-w-5xl mx-auto text-slate-950 text-3xl mb-10">
        <h1>Welocome to the Sign In Page</h1>
      </div>
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="border border-slate-950 rounded-md p-2"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border border-slate-950 rounded-md p-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              disabled={loading}
              type="submit"
              className={
                "bg-slate-950 text-white py-2 px-5 rounded-md " +
                (loading ? "opacity-70" : "")
              }>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const { token, user } = await signup(username, password, email);
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location = "/posts";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setEmail("");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="w-full p-32">
      <div className="text-center max-w-5xl mx-auto text-slate-950 text-3xl mb-10">
        <h1>Welocome to the Sign Up Page</h1>
      </div>
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="border border-slate-950 rounded-md p-2"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border border-slate-950 rounded-md p-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border border-slate-950 rounded-md p-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              disabled={loading}
              type="submit"
              className={
                "bg-slate-950 text-white py-2 px-5 rounded-md " +
                (loading ? "opacity-70" : "")
              }>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
