import { useState, useEffect } from "react";
import classes from "./main.module.scss";
import { HiPlus } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { ModalAddCoin } from "../components/ModalAddCoin";
import { useNavigate } from "react-router-dom";
import { CoinObject, PaginationObject } from "../models";
import { fetchCoinsLimitOffset, fetchCoinsNoLimit } from "../apiRequests/api";

function MainPage() {
  const [coins, setCoins] = useState<CoinObject[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [priceForModal, setPriceForModal] = useState<number>(0);
  const [nameForModal, setNameForModal] = useState<string>("0");
  const [idForModal, setIdForModal] = useState<string>("0");

  const navigate = useNavigate();

  const handleRowClick = (id: string, name: string, price: number) => {
    navigate(`/coin/${id}`, { state: { name, price } });
  };

  const handlePageClick = async (data: PaginationObject) => {
    const currentPage = data.selected + 1;

    const newData = await fetchCoinsLimitOffset(10, (currentPage - 1) * 10);
    setCoins(newData);
  };

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

  useEffect(() => {
    const getCoins = async () => {
      //init page
      const data = await fetchCoinsLimitOffset(10);
      setCoins(data);

      //get all info for total page count
      const dataAll = await fetchCoinsNoLimit();
      setPageCount(dataAll.length);
    };

    getCoins();
  }, []);

  return (
    <div className={classes.container}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Add</th>
            <th>More info</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(({ id, name, rank, priceUsd }) => (
            <tr key={id}>
              <td>{rank}</td>

              <td>{name}</td>
              <td>{priceUsd}</td>
              <td className={classes.addIconTd}>
                <HiPlus
                  className={classes.addIcon}
                  onClick={() => toggleModal(true, name, priceUsd, id)}
                />
              </td>
              <td onClick={() => handleRowClick(id, name, priceUsd)}>
                <p className={classes.moreInfoText}>Show more info</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalAddCoin
          isOpen={isModalOpen}
          onClose={toggleModal}
          priceForOne={priceForModal}
          nameForModal={nameForModal}
          idForModal={idForModal}
        />
      )}

      <ReactPaginate
        prevPageRel={"Previous"}
        nextPageRel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={classes.pagination}
        pageClassName={classes.pageItem}
        pageLinkClassName={classes.pageLink}
        previousClassName={classes.pageItem}
        previousLinkClassName={classes.pageLink}
        nextClassName={classes.pageItem}
        nextLinkClassName={classes.pageLink}
        breakClassName={classes.pageItem}
        breakLinkClassName={classes.pageLink}
        activeClassName={classes.active}
      />
    </div>
  );
}

export default MainPage;
