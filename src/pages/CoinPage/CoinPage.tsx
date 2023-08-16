import { useEffect, useState } from "react";
import classes from "./coinpage.module.scss";
import AreaChart from "../../components/charts/area-chart/chart";
import { ModalAddCoin } from "../../components/modalAddCoin/ModalAddCoin";
import { useParams } from "react-router-dom";
import { CoinObject, HistoryObject } from "../../models";
import { fetchCoin, fetchCoinHistory } from "../../apiRequests/api";
import ViewInfo from "./ViewInfo";

export const CoinPage = () => {
  //заглушка
  const [item, setItem] = useState<CoinObject>({
    id: "0",
    name: "0",
    priceUsd: 0,
    rank: 0,
    symbol: "0",
  });

  const { id } = useParams();
  const [history, setHistory] = useState<HistoryObject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceForModal, setPriceForModal] = useState<number>();
  const [nameForModal, setNameForModal] = useState<string>();
  const [idForModal, setIdForModal] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      const resById = await fetchCoin(id);
      setItem(resById);

      const historyRes = await fetchCoinHistory(id);
      setHistory(historyRes);
    };

    getData();
  }, []);

  const toggleModal = (
    isOpen: boolean,
    name: string,
    price: number,
    id: string
  ) => {
    setIsModalOpen(isOpen);
    setPriceForModal(price);
    setNameForModal(name);
    setIdForModal(id);
  };

  return (
    <div className={classes.container}>
      <ViewInfo
        name={item.name}
        symbol={item.symbol}
        priceUsd={item.priceUsd}
        toggleModal={toggleModal}
        id={item.id}
      />

      {isModalOpen && (
        <ModalAddCoin
          isOpen={isModalOpen}
          onClose={toggleModal}
          priceForOne={item.priceUsd}
          nameForModal={item.name}
          idForModal={item.id}
        />
      )}
      <div className={classes.chartBlock}>
        <AreaChart value={history} />
      </div>
    </div>
  );
};
