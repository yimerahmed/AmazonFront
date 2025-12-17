import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import amazonLogo from "../../assets/AmazonLogoSignIn.png";
import Classes from "./Register.module.css";
import { auth } from "../Utility/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();

  // Local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase signup
      await createUserWithEmailAndPassword(auth, email, password);

      // Redirect to home after signup
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={Classes.auth_container}>
      {/* Logo */}
      <Link to="/">
        <img className={Classes.auth_logo} src={amazonLogo} alt="amazon logo" />
      </Link>

      <div className={Classes.auth_box}>
        <h1>Create Account</h1>

        {error && <p className={Classes.error}>{error}</p>}

        <form onSubmit={handleRegister}>
          {/* Email */}
          <div className={Classes.auth_input}>
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password (at least 6 characters)</label>
            <input
              type="password"
              id="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Create Button */}
          <button type="submit" className={Classes.auth_btn}>
            Create your Amazon account
          </button>

          <p className={Classes.auth_text}>
            By creating an account, you agree to the{" "}
            <strong>Amazon Fake Clone</strong> Conditions of Use & Sale. Please
            see our Privacy Notice, Cookies Notice and Interest-Based Ads
            Notice.
          </p>

          {/* Already have account? */}
          <Link to="/auth">
            <button type="button" className={Classes.auth_create_btn}>
              Already have an account? Sign in
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
