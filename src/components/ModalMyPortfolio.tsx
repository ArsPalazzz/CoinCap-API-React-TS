import { useState } from "react";
import classes from './../sass/modalMyPortfolio.module.scss'
import {AiFillDelete} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr';
// import { clearLine } from "readline";

export const ModalMyPortfolio = () => {
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
            <p onClick={openModal} className={classes.modalOpenEl}>About portfolio</p>


            {isModalOpen && (
                <div className={classes.modalOverlay}>
                    <div className={classes.modal}>
                        <GrClose className={classes.closeBtn} onClick={closeModal}/>
                        <h2>Your portfolio</h2>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bitcoin1</td>
                                    <td>174.3 USD</td>
                                    <td className={classes.removeIconTd}><AiFillDelete className={classes.removeIcon}/></td>
                                </tr>
                                <tr>
                                    <td>Bitcoin1</td>
                                    <td>174.3 USD</td>
                                    <td className={classes.removeIconTd}><AiFillDelete className={classes.removeIcon}/></td>
                                </tr>
                                <tr>
                                    <td>Bitcoin1</td>
                                    <td>174.3 USD</td>
                                    <td className={classes.removeIconTd}><AiFillDelete className={classes.removeIcon}/></td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            )}
        </div>
    );
}