import { useState, useEffect } from 'react';
import classes from './sass/main.module.scss';
import { HiPlus } from 'react-icons/hi';
import ReactPaginate from 'react-paginate';

function App() {

  const [coins, setCoins] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getCoins = async () => {

      //init page
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=10`);
      const data = await res.json();
      setCoins(data.data);

      //get all info for total page count
      const resAll = await fetch(`https://api.coincap.io/v2/assets`);
      const dataAll = await resAll.json();
      setPageCount(dataAll.data.length);
    }

    getCoins();
  }, [])


  const fetchCoins = async (currentPage :  any) => {

    //get new data
    const res = await fetch(`https://api.coincap.io/v2/assets?offset=${(currentPage-1)*10}&limit=10`);
    const data = await res.json();

    return data.data;
  }

  const handlePageClick = async (data: any) => {

    const currentPage = data.selected + 1;

    const newData = await fetchCoins(currentPage);
    setCoins(newData);
  }

  return (
    <div className={classes.container}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Add</th>

          </tr>
        </thead>
        <tbody>
          {coins.map(({ id, name, rank, priceUsd }) => (
            <tr key={id}>
              <td>{rank}</td>
              <td>{name}</td>
              <td>{priceUsd}</td>
              <td className={classes.addIconTd} ><HiPlus className={classes.addIcon} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ReactPaginate
        prevPageRel={'Previous'}
        nextPageRel={'Next'}
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

export default App;