import { useState, useEffect } from "react";
import classes from "./header.module.scss";
import { ModalMyPortfolio } from "./ModalMyPortfolio";
import { useParams } from "react-router-dom";
import { usePortfolioContext } from "./PortfolioContext";
import { CoinObject, CoinInPortfolioObject } from "./../models";

export const Header = () => {
  const [popularCoins, setPopularCoins] = useState<CoinObject[]>();

  //an array of objects in portfolio
  const { portfolioData, lastAddedItem } = usePortfolioContext();

  const initialSum = portfolioData.reduce(
    (sum: number, item: CoinInPortfolioObject) => sum + item.priceUsd,
    0
  );

  let oldSum: number, percent: number;

  if (lastAddedItem) {
    oldSum = initialSum - lastAddedItem.priceUsd;

    if (oldSum === 0) {
      percent = 100;
    } else {
      percent = (initialSum / oldSum) * 100 - 100;
    }
  } else {
    oldSum = 0;
    percent = 0;
  }

  const { id } = useParams();

  useEffect(() => {
    const getCoins = async () => {
      //init page
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=3`);
      const data = await res.json();
      console.log(data.data);
      setPopularCoins(data.data);
    };

    getCoins();
  }, []);

  return (
    <header>
      {
        <nav className={classes.navigation}>
          <ul>
            {popularCoins && (
              <div>
                {popularCoins.map((item: CoinObject) => (
                  <li>{item.name}</li>
                ))}
              </div>
            )}
          </ul>

          <ModalMyPortfolio />

          <p>
            Portfolio cost: {initialSum.toFixed(2)} USD +{" "}
            {lastAddedItem ? lastAddedItem.priceUsd.toFixed(2) : 0} (
            {percent.toFixed(2)}%)
          </p>
        </nav>
      }
    </header>
  );
};
