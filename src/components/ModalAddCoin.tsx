import { useState } from "react";
import classes from './../sass/modalAddCoin.module.scss'

export const ModalAddCoin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={classes.App}>
            {/* <h1>Пример модального окна в React</h1> */}
            <button onClick={openModal}>Add to portfolio</button>


            {isModalOpen && (
                <div className={classes.modalOverlay}>
                    <div className={classes.modal}>
                        <h2>Add coin to portfolio</h2>
                        <div className={classes.elementsGroup}>
                            <div className={classes.formElement}>
                                <label>Amount</label>
                                <input type="text" placeholder="0.000"></input>
                            </div>
                            <div className={classes.formElement}>
                                <label>Price for 1 coin</label>
                                <input type="text" value={135} disabled />
                            </div>
                        </div>  
                       
                       <div className={classes.buttons}>
                            <button onClick={closeModal} className={classes.closeBtn}>Close</button>
                            <button onClick={closeModal} className={classes.addBtn}>Add</button>
                       </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
}