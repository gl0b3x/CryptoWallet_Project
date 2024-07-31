import { useState, useContext, useRef, useEffect } from "react";
import classes from "./Header.module.css";
import {
  FaDiscord,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { CryptoContext } from "../../Context/ConfigProvider.jsx";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { currentTheme, setCurrentTheme } = useContext(CryptoContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const clickOnMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`${classes.header} ${isMenuOpen ? classes.opened : ""}`}
      >
        <nav className={classes.leftBar}>
          <Link to="/" className={classes.logo}>
            <span>NexGen </span>
            Wallet
          </Link>
          <div className={classes.navBar}>
            <Link to="/prices">Prices</Link>
            <Link to="">Wallet</Link>
            <Link to="">About</Link>
            <Link to="">FAQ</Link>
          </div>
        </nav>
        <div className={classes.tools}>
          <Link to="" className={classes.logInButton}>
            Log In
          </Link>
          <Link to="" className={classes.signUpButton}>
            Sign Up
          </Link>
          {currentTheme === "light" ? (
            <FaSun
              className={classes.changeTheme}
              onClick={() => setCurrentTheme("dark")}
            />
          ) : (
            <FaMoon
              className={classes.changeTheme}
              onClick={() => setCurrentTheme("light")}
            />
          )}
          <button
            ref={buttonRef}
            className={`${classes.menu} ${isMenuOpen ? classes.opened : ""}`}
            onClick={clickOnMenu}
            aria-label="Main Menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="2em" height="2em" viewBox="0 0 100 100">
              <path
                className={`${classes.line} ${classes.line1}`}
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path
                className={`${classes.line} ${classes.line2}`}
                d="M 20,50 H 80"
              />
              <path
                className={`${classes.line} ${classes.line3}`}
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -350, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -350, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={`${classes.sideMenu} ${isMenuOpen ? classes.open : ""}`}
          >
            <Link to="/prices">Prices</Link>
            <Link to="">Wallet</Link>
            <Link to="">About</Link>
            <Link to="">FAQ</Link>
            <Link to="" className={classes.logInButton}>
              Log In
            </Link>
            <Link to="" className={classes.signUpButton}>
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: 350, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 350, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={`${classes.sideDownMenu} ${isMenuOpen ? classes.open : ""}`}
          >
            <span>NextGen Wallet © 2024</span>

            <span> Contact us</span>

            <a href="mailto:mail@gmail.com">mail@gmail.com</a>

            <a href="https://discord.com/">
              <FaDiscord />
              Discord
            </a>

            <a href="https://web.telegram.org/">
              <FaTelegram />
              Telegram
            </a>

            <a href="https://www.linkedin.com/">
              <FaLinkedin />
              Linkedin
            </a>

            <a href="https://x.com/">
              <FaTwitter />
              Twitter
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`${classes.backgroundMenu} ${isMenuOpen ? classes.open : ""}`}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
