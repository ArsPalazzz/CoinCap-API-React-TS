import React, { createContext, useContext, useState, useEffect } from "react";
import { FC } from "react";
import { CoinInPortfolioObject } from "./../models";
import { Dispatch, SetStateAction } from "react";

interface ContextType {
  portfolioData: CoinInPortfolioObject[];
  setPortfolioData: Dispatch<SetStateAction<CoinInPortfolioObject[]>>;
  removeItemFromPortfolio: (itemId: string) => void;
  lastAddedItem: CoinInPortfolioObject | null;
  setLastAddedItem: Dispatch<SetStateAction<CoinInPortfolioObject | null>>;
}

interface PortfolioProviderProps {
  children: React.ReactNode;
}

const PortfolioContext = createContext<ContextType | null>(null);

export const PortfolioProvider: FC<PortfolioProviderProps> = ({ children }) => {
  const storedPortfolioData = localStorage.getItem("portfolioData");
  const initialPortfolioData = storedPortfolioData
    ? JSON.parse(storedPortfolioData)
    : null;
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);

  const storedLastAddedItem = localStorage.getItem("lastAddedItem");
  const initialLastAddedItem = storedLastAddedItem
    ? JSON.parse(storedLastAddedItem)
    : null;
  const [lastAddedItem, setLastAddedItem] = useState(initialLastAddedItem);

  const removeItemFromPortfolio = (itemId: string) => {
    setPortfolioData((prevData: CoinInPortfolioObject[]) =>
      prevData.filter((item) => item.id !== itemId)
    );
  };

  useEffect(() => {
    localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
    localStorage.setItem("lastAddedItem", JSON.stringify(lastAddedItem));
  }, [portfolioData]);

  useEffect(() => {
    const storedPortfolioData = localStorage.getItem("portfolioData");
    const initialPortfolioData = storedPortfolioData
      ? JSON.parse(storedPortfolioData)
      : null;
    const savedPortfolioData = initialPortfolioData;

    setPortfolioData(savedPortfolioData);

    const storedLastAddedItema = localStorage.getItem("lastAddedItem");
    const initialLastAddedItem = storedLastAddedItema
      ? JSON.parse(storedLastAddedItema)
      : null;
    const savedLastAddedItem = initialLastAddedItem;

    setLastAddedItem(savedLastAddedItem);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        setPortfolioData,
        removeItemFromPortfolio,
        lastAddedItem,
        setLastAddedItem,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolioContext must be used within a PortfolioProvider"
    );
  }
  return context;
};
