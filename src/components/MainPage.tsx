import { useState, useEffect } from 'react';
import classes from './../sass/main.module.scss';
import { HiPlus } from 'react-icons/hi';
import ReactPaginate from 'react-paginate';
import { ModalAddCoin } from './ModalAddCoin';
import { useNavigate } from 'react-router-dom';
import { CoinObject, PaginationObject } from '../models';


function MainPage() {

  const [coins, setCoins] = useState<CoinObject[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [priceForModal, setPriceForModal] = useState<number>(0)
  const [nameForModal, setNameForModal] = useState<string>('0')
  const [idForModal, setIdForModal] = useState<string>('0')



  const toggleModal = (isOpen : boolean, name : string, price : number, id : string) => {
    setIsModalOpen(isOpen);
    setPriceForModal(price);
    setNameForModal(name);
    setIdForModal(id);
    console.log(isModalOpen);
  };

  const navigate = useNavigate();

  const handleRowClick = (id : string, name : string, price: number)  => {
    navigate(`/coin/${id}`, { state: { name, price } });
  };


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


  const fetchCoins = async (currentPage :  number) => {

    //get new data
    const res = await fetch(`https://api.coincap.io/v2/assets?offset=${(currentPage-1)*10}&limit=10`);
    const data = await res.json();

    return data.data;
  }

  const handlePageClick = async (data: PaginationObject) => {
    console.log('handlePageClick')
    console.log(data)
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
            <th>More info</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(({ id, name, rank, priceUsd }) => (
            <tr key={id} >
               <td>{rank}</td>
            
              <td>{name}</td>
              <td>{priceUsd}</td>
              <td className={classes.addIconTd} ><HiPlus className={classes.addIcon} onClick={() => toggleModal(true, name, priceUsd, id)}/></td>
              <td onClick={() => handleRowClick(id, name, priceUsd)} ><p className={classes.moreInfoText}>Show more info</p></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen &&  <ModalAddCoin isOpen={isModalOpen} onClose={toggleModal} priceForOne={priceForModal} nameForModal={nameForModal} idForModal={idForModal}/>}
     
      
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

export default MainPage;