import ScrollToTopButton from "../Components/Tools/ScrollToTopButton.jsx";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import CryptoDetails from "../Components/CryptoDetails/CryptoDetails.jsx";

const CryptoCurrencyPage = () => {
  return (
    <>
      <ScrollToTopButton />
      <Header />
      <CryptoDetails />
      <Footer />
    </>
  );
};

export default CryptoCurrencyPage;
