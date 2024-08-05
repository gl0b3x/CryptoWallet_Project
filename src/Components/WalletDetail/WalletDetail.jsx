import classes from "./WalletDetail.module.css";

const WalletDetail = () => {
  return (
    <main className={classes.walletDetailWrapper}>
      <div className={classes.detailItem}>
        <p className={classes.Article}>Buy and Sell 700+ crypto</p>
        <p className={classes.describeText}>
          Buy, sell and swap crypto instantly with a debit card, credit card, or
          bank transfers.
        </p>
        <img
          className={classes.imageDetail}
          src={"./phone_slider.png"}
          alt={"phone image"}
        />
      </div>
      <div className={classes.detailItem}>
        <p className={classes.Article}>Spend with Crypto Card</p>
        <p className={classes.describeText}>
          Spend more than 800 crypto directly from your crypto wallet.
        </p>
        <img
          className={classes.imageDetail}
          src={"./phone_slider.png"}
          alt={"phone image"}
        />
      </div>
      <div className={classes.detailItem}>
        <p className={classes.Article}>Swap Crypto Instantly</p>
        <p className={classes.describeText}>
          Take full control of your portfolio and swap 800+ cryptocurrencies
          instantly.
        </p>
        <img
          className={classes.imageDetail}
          src={"./phone_slider.png"}
          alt={"phone image"}
        />
      </div>
      <div className={classes.detailItem}>
        <p className={classes.Article}>Live Customer Support</p>
        <p className={classes.describeText}>
          24/7 customer support with a dedicated personal account manager.
        </p>
        <img
          className={classes.imageDetail}
          src={"./phone_slider.png"}
          alt={"phone image"}
        />
      </div>
    </main>
  );
};

export default WalletDetail;
