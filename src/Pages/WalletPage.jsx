import ScrollToTopButton from "../Components/Tools/ScrollToTopButton.jsx";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import WalletStart from "../Components/WalletStart/WalletStart.jsx";
import WalletDetail from "../Components/WalletDetail/WalletDetail.jsx";

const WalletPage = () => {
  return (
    <>
      <ScrollToTopButton />
      <Header />
      <WalletStart />
      <WalletDetail />
      <Footer />
    </>
  );
};

export default WalletPage;
