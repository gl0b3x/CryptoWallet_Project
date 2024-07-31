import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage.jsx";
import PricesPage from "../Pages/PricesPage.jsx";
import CryptoCurrencyPage from "../Pages/CryptoCurrencyPage.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route
          path="/cryptocurrency/:symbol"
          element={<CryptoCurrencyPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
