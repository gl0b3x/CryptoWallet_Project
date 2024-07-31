import ScrollToTopButton from "../Components/Tools/ScrollToTopButton.jsx";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import CurrenciesPreview from "../Components/CurrenciesPreview/CurrenciesPreview.jsx";
import ListOfCurrencies from "../Components/ListOfCurrencies/ListOfCurrencies.jsx";

const PricesPage = () => {
  return (
    <>
      <ScrollToTopButton />
      <Header />
      <CurrenciesPreview />
      <ListOfCurrencies />
      <Footer />
    </>
  );
};

export default PricesPage;
