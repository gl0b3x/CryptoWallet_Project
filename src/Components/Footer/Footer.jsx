import classes from "./Footer.module.css";
import { FaDiscord, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <section className={classes.footerWrapper}>
      <img
        className={classes.backgroundImage}
        src="/footerBackground.png"
        alt="background image"
      />
      <div className={classes.footerNavigation}>
        <motion.ul
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: -0, opacity: 1 }}
          transition={{ duration: 2 }}
          className={classes.footerNav}
        >
          <li>
            <a href="/prices">Prices</a>
          </li>
          <li>
            <a href="#">Wallet</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </motion.ul>
        <motion.ul
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className={classes.footerNav}
        >
          <li>
            <a href="https://discord.com/">
              <FaDiscord />
              Discord
            </a>
          </li>
          <li>
            <a href="https://web.telegram.org/">
              <FaTelegram />
              Telegram
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <FaLinkedin />
              Linkedin
            </a>
          </li>
          <li>
            <a href="https://x.com/">
              <FaTwitter />
              Twitter
            </a>
          </li>
        </motion.ul>
        <motion.ul
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className={classes.footerNav}
        >
          <li>
            <span>NextGen Wallet © 2024</span>
          </li>
          <li>
            <span> Contact us</span>
          </li>
          <li>
            <a href="mailto:mail@gmail.com">mail@gmail.com</a>
          </li>
        </motion.ul>
      </div>
    </section>
  );
};

export default Footer;
