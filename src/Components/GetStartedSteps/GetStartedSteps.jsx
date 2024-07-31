import classes from "./GetStartedSteps.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Parallax } from "swiper/modules";
import CreateAccountButton from "../CreateAccountButton/CreateAccountButton.jsx";
import { motion } from "framer-motion";

import "swiper/css";
import { useEffect, useState } from "react";

const GetStartedSteps = () => {
  const [direction, setDirection] = useState(
    window.innerWidth < 991 ? "horizontal" : "vertical",
  );

  const handleResize = () => {
    setDirection(window.innerWidth < 991 ? "horizontal" : "vertical");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={classes.getStartedStepsWrapper}>
      <motion.p
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className={classes.article}
      >
        Get Started In <span> 4 Easy Steps </span>
      </motion.p>
      <Swiper
        className={classes.swiperWrapper}
        loop={true}
        direction={direction}
        spaceBetween={0}
        pagination={{ clickable: true }}
        modules={[Pagination, Mousewheel, Parallax]}
        mousewheel={true}
        parallax={true}
        speed={600}
      >
        <SwiperSlide className={classes.slideWrapper}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={classes.slideContent}
          >
            <div className={classes.leftBlock}>
              <img
                className={classes.photoContent}
                src="/phone_slider.png"
                alt="screenshot of phone"
              />
            </div>
            <div className={classes.rightBlock}>
              <span className={classes.numberStep} data-swiper-parallax="-200">
                1
              </span>
              <span className={classes.nameStep} data-swiper-parallax="-200">
                Sign Up
              </span>
              <span
                className={classes.describeStep}
                data-swiper-parallax="-200"
              >
                Create an account on the <span>NextGen</span> Wallet
              </span>
              <CreateAccountButton
                style={{ width: "80%" }}
                text={"Create Wallet"}
                speed={120}
              />
            </div>
          </motion.div>
        </SwiperSlide>

        <SwiperSlide className={classes.slideWrapper}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={classes.slideContent}
          >
            <div className={classes.leftBlock}>
              <img
                className={classes.photoContent}
                src="/phone_slider.png"
                alt="screenshot of phone"
              />
            </div>
            <div className={classes.rightBlock}>
              <span className={classes.numberStep} data-swiper-parallax="-200">
                2
              </span>
              <span className={classes.nameStep} data-swiper-parallax="-200">
                Complete the KYC
              </span>
              <span
                className={classes.describeStep}
                data-swiper-parallax="-200"
              >
                Ensure your account security and unlock all features by
                completing KYC process.
              </span>
              <CreateAccountButton
                style={{ width: "80%" }}
                text={"Create Wallet"}
                speed={120}
              />
            </div>
          </motion.div>
        </SwiperSlide>

        <SwiperSlide className={classes.slideWrapper}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={classes.slideContent}
          >
            <div className={classes.leftBlock}>
              <img
                className={classes.photoContent}
                src="/phone_slider.png"
                alt="screenshot of phone"
              />
            </div>
            <div className={classes.rightBlock}>
              <span className={classes.numberStep} data-swiper-parallax="-200">
                3
              </span>
              <span className={classes.nameStep} data-swiper-parallax="-200">
                Buy/Sell Crypto
              </span>
              <span
                className={classes.describeStep}
                data-swiper-parallax="-200"
              >
                Buy or sell crypto on our exchange
              </span>
              <CreateAccountButton
                style={{ width: "80%" }}
                text={"Create Wallet"}
                speed={120}
              />
            </div>
          </motion.div>
        </SwiperSlide>

        <SwiperSlide className={classes.slideWrapper}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={classes.slideContent}
          >
            <div className={classes.leftBlock}>
              <img
                className={classes.photoContent}
                src="/phone_slider.png"
                alt="screenshot of phone"
              />
            </div>
            <div className={classes.rightBlock}>
              <span className={classes.numberStep} data-swiper-parallax="-200">
                4
              </span>
              <span className={classes.nameStep} data-swiper-parallax="-200">
                Get Crypto Card
              </span>
              <span
                className={classes.describeStep}
                data-swiper-parallax="-200"
              >
                Create our crypto card and start spending 700+ cryptocurrencies
              </span>
              <CreateAccountButton
                style={{ width: "80%" }}
                text={"Create Wallet"}
                speed={120}
              />
            </div>
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default GetStartedSteps;
