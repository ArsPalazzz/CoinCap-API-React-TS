import { useState } from 'react';
import classes from './../sass/header.module.scss'
import {ModalMyPortfolio} from './ModalMyPortfolio'


export const Header = () => {

    

    return (
        <header>
            <nav className={classes.navigation}>
                <ul>
                    <li>Bitcoin1</li>
                    <li>Bitcoin2</li>
                    <li>Bitcoin3</li>
                </ul>
                <ModalMyPortfolio />
               
                <p>Portfolio cost: 154,55 USD + 4,23 (2,4 %)</p>
               
            </nav>
           
        </header>
    );
}