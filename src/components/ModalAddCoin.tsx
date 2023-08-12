import { useState, useEffect, ChangeEvent } from "react";
import classes from './../sass/modalAddCoin.module.scss'
import { usePortfolioContext } from './PortfolioContext';
import { ModalAddCoinProps, CoinInPortfolioObject } from "../models";

export const ModalAddCoin = ({ isOpen, onClose, priceForOne, nameForModal, idForModal } : ModalAddCoinProps) => {


const { setPortfolioData, setLastAddedItem } = usePortfolioContext();
    

    const [visible, setVisible] = useState(isOpen);



    const addCoin = () => {
        const newAmount = inputValue; 
        if (!isNaN(newAmount) && newAmount > 0) {
            const newData = {
                id: idForModal,
                name: nameForModal,
                amount: newAmount,
                currentCourse: priceForOne,
                priceUsd: newAmount * priceForOne,
            };

            setPortfolioData((prevData: CoinInPortfolioObject[]) => [...prevData, newData]);
            setLastAddedItem(newData);

            setInputValue(0);
            closeModal();
        }
    };



    const closeModal = () => {
        onClose(false, '0', 0, '0');
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(parseFloat(event.target.value));
    }

    const [inputValue, setInputValue] = useState(0);

    useEffect(() => {
        setVisible(isOpen);
    }, [isOpen]);



    return (
        <div className={`modalA ${isOpen ? 'open' : ''}`}>
            <div className={classes.App}>
                <div className={classes.modalOverlay}>
                    <div className={classes.modal}>
                        <h2>Add coin to portfolio</h2>
                        <div className={classes.elementsGroup}>
                            <div className={classes.formElement}>
                                <label>Amount</label>
                                <input placeholder="0.000" type="number" inputMode="numeric" onChange={handleChange}></input>
                            </div>
                            <div className={classes.formElement}>
                                <label>Price for 1 coin</label>
                                <input type="text" value={priceForOne} disabled />
                            </div>

                        </div>
                        <p>Total price: {inputValue * priceForOne}</p>
                        <div className={classes.buttons}>
                            <button onClick={closeModal} className={classes.closeBtn}>Close</button>
                            <button onClick={addCoin} className={classes.addBtn}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}