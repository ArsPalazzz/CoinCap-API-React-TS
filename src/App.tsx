import MainPage from "./pages/MainPage/MainPage";
import { Header } from "./components/header/Header";
import { PortfolioProvider } from "./components/PortfolioContext";
import { CoinPage } from "./pages/CoinPage/CoinPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <PortfolioProvider>
      <Header />
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </PortfolioProvider>
  );
}

export default App;
