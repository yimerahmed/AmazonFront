import React from 'react';
import classes from './Header.module.css'
import { IoMdMenu } from "react-icons/io";

const LowerHeader = () => {
  return (
    <div className={classes.lower_Header}>
      <ul>
        <li>
          <IoMdMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Prime Video</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Customer Service</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
