import { useState, useEffect } from "react";
import classes from "./Tools.module.css";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible && window.pageYOffset > 300) {
        setIsVisible(true);
      } else if (isVisible && window.pageYOffset <= 300) {
        setIsVisible(false);
      }
    };

    let timeoutId;
    const handleScrollThrottled = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <>
      <div
        onClick={scrollToTop}
        className={`${classes.scrollTopButton} ${isVisible ? classes.visible : classes.hidden}`}
      >
        <FaArrowUp />
      </div>
    </>
  );
};

export default ScrollToTopButton;
