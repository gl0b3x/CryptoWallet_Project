import { useEffect, useRef } from "react";
import classes from "./MobileApp.module.css";
import { motion } from "framer-motion";

const MobileApp = () => {
  const phoneRef = useRef(null);

  const handleScroll = () => {
    if (phoneRef.current) {
      const rect = phoneRef.current.getBoundingClientRect();
      const isVisible =
        rect.top + 60 < window.innerHeight && rect.bottom > window.innerHeight;

      if (isVisible) {
        const elementHeight = rect.bottom - rect.top;
        const elementHeightVisible =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleFraction = (elementHeightVisible / elementHeight) * 52;
        let rotation = 50 - visibleFraction;

        if (rotation < 0) rotation = 0;

        phoneRef.current.style.transform = `rotateX(${rotation}deg) translateZ(0px)`;
        phoneRef.current.style.transformOrigin = "50% 0";
      } else {
        if (rect.bottom < 0) {
          phoneRef.current.style.transform = "rotateX(0deg) translateZ(0px)";
          phoneRef.current.style.transformOrigin = "50% 0";
        } else if (rect.top > window.innerHeight) {
          phoneRef.current.style.transform = "rotateX(50deg) translateZ(0px)";
          phoneRef.current.style.transformOrigin = "50% 0";
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={classes.mobileAppWrapper}>
      <div className={classes.mobileApp}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className={classes.text}
        >
          <span className={classes.article}>
            Get <span> NexGen Wallet </span>
          </span>
          <span className={classes.articleSecond}>
            All Crypto Needs in One App
          </span>
          <div className={classes.download}>
            <img
              src="./AppStore.png"
              alt="Download from App Store"
              loading="lazy"
            />
            <img
              src="./GooglePlay.png"
              alt="Download from Google Play"
              loading="lazy"
            />
          </div>
        </motion.div>
        <div style={{ perspective: "1000px" }}>
          <div ref={phoneRef} className={classes.phone}>
            <img
              src={"./phone.png"}
              alt="View of App on Phone"
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
