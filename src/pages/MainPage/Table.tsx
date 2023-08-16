import { CoinObject } from "../../models";
import classes from "./main.module.scss";
import { HiPlus } from "react-icons/hi";

interface TableProps {
  coins: CoinObject[];
  toggleModal: (
    isOpen: boolean,
    name: string,
    price: number,
    id: string
  ) => void;
  handleRowClick: (id: string, name: string, price: number) => void;
}

const Table = ({ toggleModal, handleRowClick, coins }: TableProps) => {
  return (
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
  );
};

export default Table;
