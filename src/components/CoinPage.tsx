import { useEffect, useState } from 'react';
import classes from './../sass/coinpage.module.scss';
import AreaChart from './charts/area-chart/chart';
import { ModalAddCoin } from './ModalAddCoin';
import { useParams } from 'react-router-dom';
import { CoinObject, HistoryObject } from './../models';



export const CoinPage = () => {

    //заглушка
    const [item, setItem] = useState<CoinObject>({
        id: '0',
        name : '0',
        priceUsd : 0,
        rank : 0,
        symbol : '0'
    });
    const [history, setHistory] = useState<HistoryObject[]>([]);


    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const resById = await fetch(`https://api.coincap.io/v2/assets/${id}`);
            const dataById = await resById.json();

            setItem(dataById.data);


            const historyRes = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=h6`);
            const historyData = await historyRes.json();

            setHistory(historyData.data);

        }

        getData();
    }, [])


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [priceForModal, setPriceForModal] = useState<number>()
    const [nameForModal, setNameForModal] = useState<string>()
    const [idForModal, setIdForModal] = useState<string>()


    const toggleModal = (isOpen: boolean, name: string, price: number, id: string) => {
        setIsModalOpen(isOpen);
        setPriceForModal(price);
        setNameForModal(name);
        setIdForModal(id);
    };


    return (
        <div className={classes.container}>
            <h2>Name: {item.name}</h2>

            <p>Symbol: {item.symbol}</p>
            <p>Price: {item.priceUsd}</p>

            <button onClick={() => toggleModal(true, item.name, item.priceUsd, item.id)}>Add to portfolio</button>

            {isModalOpen && <ModalAddCoin isOpen={isModalOpen} onClose={toggleModal} priceForOne={item.priceUsd} nameForModal={item.name} idForModal={item.id} />}
            <div className={classes.chartBlock}>
                <AreaChart value={history} />
            </div>
        </div>
    );
}

