import classes from "./Statistic.module.css";
import CreateAccountButton from "../CreateAccountButton/CreateAccountButton.jsx";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

const Statistic = () => {
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <section className={classes.statisticWrapper}>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={classes.leftBlock}
      >
        <img
          className={classes.cryptoWallet}
          src="./blockchain.png"
          alt="Blockchain photo"
          draggable="false"
          loading="lazy"
        />
      </motion.div>
      <div className={classes.rightBlock}>
        <motion.span
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={classes.article}
        >
          Create an account, link your bank account and start buying and selling{" "}
          <span>Cryptocurrencies</span> now.
        </motion.span>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CreateAccountButton text={"Create An Account Now"} />
        </motion.div>
        <div className={classes.statistic}>
          <motion.div
            className={classes.blockStats}
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0 }}
          >
            <CountUp
              end={getRandomArbitrary(200000, 300000)}
              duration={5}
              suffix={"+"}
            >
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} className={classes.ArticleStats} />
                </VisibilitySensor>
              )}
            </CountUp>
            <span className={classes.describeStats}>
              Users are already using our wallet
            </span>
          </motion.div>
          <motion.div
            className={classes.blockStats}
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <CountUp end={700} suffix={"+"} duration={5}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} className={classes.ArticleStats} />
                </VisibilitySensor>
              )}
            </CountUp>
            <span className={classes.describeStats}>
              Cryptocurrencies supported
            </span>
          </motion.div>
          <motion.div
            className={classes.blockStats}
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <CountUp end={120} suffix={"$"} duration={5}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} className={classes.ArticleStats} />
                </VisibilitySensor>
              )}
            </CountUp>
            <span className={classes.describeStats}>
              Billions already on our wallets
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
