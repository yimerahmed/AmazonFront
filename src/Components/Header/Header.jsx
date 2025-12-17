import React, { useContext } from "react";
import amazon_logo from "../../assets/amazon_PNG11.png";
import { SlLocationPin } from "react-icons/sl";
import usaFlag from "../../assets/USA_flag.png";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { auth } from "../../Pages/Utility/firebase";
import { signOut } from "firebase/auth";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  // Total items including quantities
  const totalItems = basket.reduce((total, item) => total + item.amount, 0);

  // Extract first name from email
  const firstName = user?.email ? user.email.split("@")[0] : null;
  // Handle Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/auth");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={classes.outer_wrapper}>
      <section className={classes.header_wrapper}>
        {/* LEFT */}
        <div className={classes.left_wrapper}>
          <Link to="/">
            <img src={amazon_logo} alt="amazon-logo" />
          </Link>

          <span className={classes.map_icon}>
            <SlLocationPin />
          </span>

          <div className={classes.deliver_wrapper}>
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className={classes.search_wrapper}>
          <select>
            <option value="">All</option>
            <option value="">Arts & Crafts</option>
            <option value="">Automative</option>
            <option value="">Baby</option>
            <option value="">Beauty and Personal care</option>
            <option value="">Books</option>
            <option value="">Boy's fashion</option>
            <option value="">Computers</option>
            <option value="">Deals</option>
            <option value="">Digital Music</option>
            <option value="">Electronics</option>
            <option value="">Girl's fashion</option>
            <option value="">Kindle store</option>
            <option value="">Health and Household</option>
            <option value="">Movies and TV</option>
            <option value="">Luggage</option>
          </select>
          <input type="text" placeholder="Search product..." />
          <span className={classes.search_icon}>
            <FaSearch size={25} />
          </span>
        </div>

        {/* RIGHT */}
        <div className={classes.right_wrapper}>
          {/* Language */}
          <div className={classes.language}>
            <img src={usaFlag} alt="flag" />
            <select>
              <option value="">EN</option>
              <option value="">中文 (繁體) - ZH - 翻譯</option>
              <option value="">Deutsch - DE - Übersetzung</option>
              <option value=""> español - ES - Traducción</option>
              <option value="">العربية - AR - الترجمة</option>
            </select>
            {/* <FaAngleDown /> */}
          </div>

          {/* SIGN-IN / USER NAME */}
          {!user ? (
            <Link to="/auth" className={classes.hello}>
              <div>
                <p>Hello, sign in</p>
                <span>Account & Lists</span>
              </div>
            </Link>
          ) : (
            <div className={classes.hello}>
              <p>Hello, {firstName}</p>
              <button onClick={handleSignOut} className={classes.signout_btn}>
                Sign Out
              </button>
            </div>
          )}

          {/* ORDERS */}
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* CART */}
          <Link to="/cart" className={classes.cart}>
            <IoCartOutline size={35} />
            <span>{totalItems}</span>
            <span className={classes.cart_Text}>Cart</span>
          </Link>
        </div>
      </section>

      <LowerHeader />
    </div>
  );
};

export default Header;
