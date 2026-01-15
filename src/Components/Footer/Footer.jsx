import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footerWrapper}>
      {/* Back to Top */}
      <div className={styles.backToTop} onClick={scrollToTop}>
        Back to top
      </div>

      {/* UPPER FOOTER SECTION (upperFooter.PNG) */}
      <section className={styles.upperSection}>
        <div className={styles.upperContainer}>
          <div className={styles.column}>
            <h3>Get to Know Us</h3>
            <ul>
              <li>Careers</li>
              <li>Blog</li>
              <li>About Amazon</li>
              <li>Investor Relations</li>
              <li>Amazon Devices</li>
              <li>Amazon Science</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Make Money with Us</h3>
            <ul>
              <li>Sell products on Amazon</li>
              <li>Sell on Amazon Business</li>
              <li>Sell apps on Amazon</li>
              <li>Become an Affiliate</li>
              <li>Advertise Your Products</li>
              <li>Self-Publish with Us</li>
              <li>Host an Amazon Hub</li>
              <li>› See More Make Money with Us</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Amazon Payment Products</h3>
            <ul>
              <li>Amazon Business Card</li>
              <li>Shop with Points</li>
              <li>Reload Your Balance</li>
              <li>Amazon Currency Converter</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Let Us Help You</h3>
            <ul>
              <li>Amazon and COVID-19</li>
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Shipping Rates & Policies</li>
              <li>Returns & Replacements</li>
              <li>Manage Your Content and Devices</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LOWER FOOTER SECTION (lowerFooter.PNG) */}
      <section className={styles.lowerSection}>
        <div className={styles.lowerGrid}>
          {/* Detailed Service Grid Items */}
          <div className={styles.serviceItem}>
            <h4>Amazon Music</h4>
            <p>
              Stream millions
              <br />
              of songs
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Amazon Advertising</h4>
            <p>
              Find, attract, and
              <br />
              engage customers
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>6pm</h4>
            <p>
              Score deals
              <br />
              on fashion brands
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>AbeBooks</h4>
            <p>
              Books, art
              <br />& collectibles
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>ACX</h4>
            <p>
              Audiobook Publishing
              <br />
              Made Easy
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Sell on Amazon</h4>
            <p>
              Start a Selling
              <br />
              Account
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Veeqo</h4>
            <p>
              Shipping Software
              <br />
              Inventory Management
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Amazon Business</h4>
            <p>
              Everything For
              <br />
              Your Business
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>AmazonGlobal</h4>
            <p>
              Ship Orders
              <br />
              Internationally
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Home Services</h4>
            <p>
              Experienced Pros
              <br />
              Happiness Guarantee
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Amazon Web Services</h4>
            <p>
              Scalable Cloud
              <br />
              Computing Services
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Audible</h4>
            <p>
              Listen to Books & Original
              <br />
              Audio Performances
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Box Office Mojo</h4>
            <p>
              Find Movie
              <br />
              Box Office Data
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Goodreads</h4>
            <p>
              Book reviews
              <br />& recommendations
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>IMDb</h4>
            <p>
              Movies, TV
              <br />& Celebrities
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>IMDbPro</h4>
            <p>
              Get Info Entertainment
              <br />
              Professionals Need
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Kindle Direct Publishing</h4>
            <p>
              Indie Digital & Print Publishing
              <br />
              Made Easy
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Prime Video Direct</h4>
            <p>
              Video Distribution
              <br />
              Made Easy
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Shopbop</h4>
            <p>
              Designer
              <br />
              Fashion Brands
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Woot!</h4>
            <p>
              Deals and
              <br />
              Shenanigans
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Zappos</h4>
            <p>
              Shoes &<br />
              Clothing
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Ring</h4>
            <p>
              Smart Home
              <br />
              Security Systems
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>eero WiFi</h4>
            <p>
              Stream 4K Video
              <br />
              in Every Room
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Blink</h4>
            <p>
              Smart Security
              <br />
              for Every Home
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Neighbors App</h4>
            <p>
              {" "}
              Real-Time Crime
              <br />& Safety Alerts
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h4>Amazon Subscription Boxes</h4>
            <p>Top subscription boxes – right to your door</p>
          </div>
          <div className={styles.serviceItem}>
            <h4>PillPack</h4>
            <p>
              Pharmacy
              <br />
              Simplified
            </p>
          </div>
        </div>

        <div className={styles.legalSection}>
          <div className={styles.legalLinks}>
            <span>Conditions of Use</span>
            <span>Privacy Notice</span>
            <span>Your Ads Privacy Choices</span>
          </div>
          <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
