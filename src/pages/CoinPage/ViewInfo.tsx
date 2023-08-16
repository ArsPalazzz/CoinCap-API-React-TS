import { ViewInfoProps } from "./../../models";

const ViewInfo = ({
  name,
  symbol,
  priceUsd,
  id,
  toggleModal,
}: ViewInfoProps) => {
  return (
    <>
      <h2>Name: {name}</h2>
      <p>Symbol: {symbol}</p>
      <p>Price: {priceUsd}</p>

      <button onClick={() => toggleModal(true, name, priceUsd, id)}>
        Add to portfolio
      </button>
    </>
  );
};

export default ViewInfo;
