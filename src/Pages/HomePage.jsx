import Header from "../Components/Header/Header.jsx";
import Main from "../Components/Main/Main.jsx";
import Statistic from "../Components/Statistic/Statistic.jsx";
import MobileApp from "../Components/MobileApp/MobileApp.jsx";
import Reasons from "../Components/Reasons/Reasons.jsx";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton.jsx";
import GetStartedSteps from "../Components/GetStartedSteps/GetStartedSteps.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const HomePage = () => {
  return (
    <>
      <ScrollToTopButton />
      <Header />
      <Main />
      <Statistic />
      <GetStartedSteps />
      <MobileApp />
      <Reasons />
      <Footer />
    </>
  );
};

export default HomePage;
