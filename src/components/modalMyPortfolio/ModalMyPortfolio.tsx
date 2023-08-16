import { useState } from "react";
import classes from "./modalMyPortfolio.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { usePortfolioContext } from "../PortfolioContext";
import { CoinInPortfolioObject } from "../../models";

export const ModalMyPortfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolioContext = usePortfolioContext();

  if (!portfolioContext) {
    return null;
  }

  const { portfolioData, removeItemFromPortfolio } = portfolioContext;

  const handleRemoveItem = (itemId: string) => {
    removeItemFromPortfolio(itemId);

    localStorage.removeItem(itemId);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.App}>
      <p onClick={openModal} className={classes.modalOpenEl}>
        About portfolio
      </p>

      {isModalOpen && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <GrClose className={classes.closeBtn} onClick={closeModal} />
            <h2>Your portfolio</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Current course</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData?.map((item: CoinInPortfolioObject) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.currentCourse}</td>
                    <td>{item.priceUsd} USD</td>
                    <td className={classes.removeIconTd}>
                      <AiFillDelete
                        className={classes.removeIcon}
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
