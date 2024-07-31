import { useEffect, useState } from "react";
import classes from "./CurrenciesPreview.module.css";
import Api from "../Api/Api.js";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonLoading from "../Tools/SkeletonLoading.jsx";
import { motion } from "framer-motion";
import FormatPrice from "../Tools/FormatPrice.jsx";
import { Link } from "react-router-dom";

const CurrenciesPreviw = () => {
  const [popularCoins, setPopularCoins] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(false);

  const array = [1, 2, 3, 4, 5, 6, 8, 9, 10];

  useEffect(() => {
    const fetchPopularCoins = async () => {
      try {
        const response = await Api.getAllCrypto({ limit: 10, page: 1 });
        setPopularCoins(response.data.result);
        setLoadingPopular(false);
      } catch (error) {
        console.error("Error fetching Popular Coins...", error);
      }
    };
    fetchPopularCoins();
  }, []);

  return (
    <main className={classes.PreviewWrapper}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className={classes.article}
      >
        top 10 popular cryptocurrencies
      </motion.p>

      <Swiper
        className={classes.swiperWrapper}
        loop={true}
        direction="horizontal"
        spaceBetween={10}
        breakpoints={{
          550: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 3,
          },
          1199: {
            slidesPerView: 4,
          },
        }}
        mousewheel={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Mousewheel, Autoplay]}
      >
        {loadingPopular
          ? array.map((index) => (
              <SwiperSlide key={index} className={classes.slideLoader}>
                <SkeletonLoading style={{ width: "95%", height: "70%" }} />
              </SwiperSlide>
            ))
          : popularCoins.map((coin, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: index * 0.35 }}
                  animate={{ opacity: 1 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Link
                    to={`/cryptocurrency/${coin.id.toLowerCase()}`}
                    className={classes.slidePopularContent}
                  >
                    <div className={classes.leftSidePopularContent}>
                      <img
                        className={classes.popularTokenImage}
                        src={coin.icon}
                        alt={coin.id}
                      />
                      <span className={classes.popularTokenName}>
                        {coin.symbol}
                      </span>
                    </div>
                    <span className={classes.popularTokenPrice}>
                      <FormatPrice price={coin.price} /> $
                    </span>
                    <span
                      className={`${classes.popularTokenChange} ${coin.priceChange1d > 0 ? classes.up : classes.down}`}
                    >
                      {coin.priceChange1d > 0 ? "+" : <></>}
                      {coin.priceChange1d}%
                    </span>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
      </Swiper>
    </main>
  );
};

export default CurrenciesPreviw;
