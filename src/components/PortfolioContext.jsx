import React, { createContext, useContext, useState, useEffect } from 'react';


const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(JSON.parse(localStorage.getItem('portfolioData')));
  const [lastAddedItem, setLastAddedItem] = useState(JSON.parse(localStorage.getItem('lastAddedItem')));

  const removeItemFromPortfolio = (itemId) => {
    setPortfolioData(prevData => prevData.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    localStorage.setItem('lastAddedItem', JSON.stringify(lastAddedItem));
  }, [portfolioData]);

  useEffect(() => {
    const savedPortfolioData = JSON.parse(localStorage.getItem('portfolioData'));
    setPortfolioData(savedPortfolioData);
    const savedLastAddedItem = JSON.parse(localStorage.getItem('lastAddedItem'));
    setLastAddedItem(savedLastAddedItem);
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData, removeItemFromPortfolio, lastAddedItem, setLastAddedItem }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => useContext(PortfolioContext);