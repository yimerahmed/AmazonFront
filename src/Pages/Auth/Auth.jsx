import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import amazonLogo from "../../assets/AmazonLogoSignIn.png";
import Classes from "./Signup.module.css";
import { auth } from "../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { DataContext } from "../../Context/DataProvider";
import { DataContext } from "../../../src/Context/DataContext";
import ClipLoader from "react-spinners/ClipLoader";

const Auth = () => {
  const navigate = useNavigate();
  const [, dispatch] = useContext(DataContext);

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // SIGN IN
    if (e.target.name === "SignIn") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: "SET_USER",
            user: userinfo.user,
          });

          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    }

    // SIGN UP
    if (e.target.name === "SignUp") {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: "SET_USER",
            user: userinfo.user,
          });

          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={Classes.auth_container}>
      {/* Logo */}
      <Link to="/">
        <img className={Classes.auth_logo} src={amazonLogo} alt="amazon logo" />
      </Link>

      <div className={Classes.auth_box}>
        <h1>Sign in</h1>

        {error && <p className={Classes.error}>{error}</p>}

        <form>
          {/* Email */}
          <div className={Classes.auth_input}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className={Classes.auth_input}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            name="SignIn"
            className={Classes.auth_btn}
            onClick={handleSubmit}
          >
            {loading.signIn ? <ClipLoader size={25} /> : "Sign in"}
          </button>

          <p className={Classes.auth_text}>
            By signing in you agree to the <strong>Amazon Fake Clone</strong>{" "}
            Conditions of Use & Sale. Please see our Privacy Notice, Cookies
            Notice and Interest-Based Ads Notice.
          </p>

          {/* SIGN UP BUTTON */}
          <button
            type="submit"
            name="SignUp"
            className={Classes.auth_create_btn}
            onClick={handleSubmit}
          >
            {loading.signUp ? (
              <ClipLoader size={25} />
            ) : (
              "Create your Amazon account"
            )}
          </button>

          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </form>
      </div>
    </section>
  );
};

export default Auth;


