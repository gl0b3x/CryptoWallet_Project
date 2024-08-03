import { useState } from "react";
import classes from "./Reasons.module.css";
import { motion } from "framer-motion";
import { TfiBarChart, TfiBarChartAlt } from "react-icons/tfi";
import { FaArrowLeft, FaArrowRight, FaMoneyCheck } from "react-icons/fa";
import { IoMdSwap } from "react-icons/io";
import { MdShowChart } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";

const blocks = [
  {
    id: 1,
    icon: <TfiBarChart />,
    name: "Buy",
    text: "The best way to buy crypto instantly. Low and transparent fees with no hidden fees.",
  },
  {
    id: 2,
    icon: <TfiBarChartAlt />,
    name: "Sell",
    text: "Sell crypto instantly. The best way to convert your BTC, ETH and 700+ other crypto to cash at low fees.",
  },
  {
    id: 3,
    icon: <FaMoneyCheck />,
    name: "Spend",
    text: "NextGen Wallet allows you to spend crypto directly from your wallet. Spend crypto like fiat!",
  },
  {
    id: 4,
    icon: <IoMdSwap />,
    name: "Swap",
    text: "Take full control of your portfolio and exchange crypto with other cryptocurrencies instantly.",
  },
  {
    id: 5,
    icon: <MdShowChart />,
    name: "Earn",
    text: "Earn crypto cashback of up to 5% on every card transaction and an additional 5% from staking rewards.",
  },
  {
    id: 6,
    icon: <RiExchange2Fill />,
    name: "B2B Opportunities",
    text: "List your token and make it more accessible to users with the help of our exchange and community.",
  },
];

const Reasons = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section className={classes.reasonBlockWrapper}>
      <motion.div
        initial={{ y: -75, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className={classes.text}
      >
        <span className={classes.article}>Why everyone choose</span>
        <span className={classes.nameWallet}>NexGen Wallet</span>
      </motion.div>
      <div className={classes.reasons}>
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            className={classes.reasonBlock}
            initial={{ transform: "scale(0.9)", opacity: 0 }}
            whileInView={{ transform: "scale(1)", opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div
              className={`${classes.card} ${flippedCard === block.id ? classes.flipped : ""}`}
            >
              <div className={`${classes.cardFace} ${classes.front}`}>
                <div className={classes.iconReason}>{block.icon}</div>
                <p className={classes.nameReason}>{block.name}</p>
                <div
                  className={classes.ClickNativeRight}
                  onClick={() => handleFlip(block.id)}
                >
                  <FaArrowRight className={classes.svgCard} />
                </div>
              </div>
              <div className={`${classes.cardFace} ${classes.back}`}>
                <p className={classes.textReason}>{block.text}</p>
                <div
                  className={classes.ClickNativeLeft}
                  onClick={() => handleFlip(block.id)}
                >
                  <FaArrowLeft className={classes.svgCard} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;
