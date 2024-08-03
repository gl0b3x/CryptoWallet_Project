import classes from "./WalletStart.module.css";
import { motion } from "framer-motion";

const WalletStart = () => {
  return (
    <main className={classes.walletStartWrapper}>
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className={classes.leftSection}
      >
        <span className={classes.Article}>
          One <span> NexGen Wallet </span> for Everyday Need
        </span>
        <span className={classes.descriptionText}>
          Buy, Sell, Spend, and Manage more than 700 cryptocurrencies.
          <span> NexGenWallet.com </span> account to manage crypto anywhere from
          any device.
        </span>
      </motion.div>
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className={classes.rightSection}
      >
        <motion.img
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className={classes.walletPhoto}
          src="./card.png"
          loading="lazy"
          alt="debit cards"
          draggable="false"
        />
      </motion.div>
    </main>
  );
};

export default WalletStart;
