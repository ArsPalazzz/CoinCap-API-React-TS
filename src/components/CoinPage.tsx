import {useEffect, useState} from 'react';
import classes from './../sass/coinpage.module.scss';
import AreaChart from './charts/area-chart/chart';
import { ModalAddCoin } from './ModalAddCoin';


interface IItemProps {
    id: string,
    rank: number,
    symbol: string,
    name: string,
    priceUsd: number
}

export const CoinPage = () => {

    const [item2, setItem2] = useState<any>([]);
    const [test, setTest] = useState<any>([]);

    useEffect( () => {
        const getData = async () => {
            const res = await fetch(`https://api.coincap.io/v2/assets/bitcoin`);
            const data = await res.json();
            
            setItem2(data.data);


            const res2 = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=h6`);
            const data2 = await res2.json();
            
            setTest(data2.data);
           
        }

        getData();
    }, [])


    useEffect( () => {
        console.log(test)
    }, [test])

    return (
        <div className={classes.container}>
                <h2>Name: {item2.name}</h2>
                
                <p>Symbol: {item2.symbol}</p>
                <p>Price: {item2.priceUsd}</p>
                

                <ModalAddCoin />
                {/* {test.map( ({priceUsd, date} : any) => {
                    return <p>{date}: {priceUsd}</p>
                })} */}
                <div className={classes.chartBlock}>
                    <AreaChart value={test}/>
                </div>
              
              
        </div>
      
       
    );
}

