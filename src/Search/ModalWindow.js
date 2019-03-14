import React from 'react';
import Tilt from 'react-vanilla-tilt';

export const ModalWindow = ({country, onClick}) =>{
    const closeModal = (event) =>{
        event.preventDefault();
        
        if (onClick) {
            onClick();
        }
    };
   
    return (
        <div className = 'modal'>
            <Tilt
                className = 'tilt'>
                <div className = 'content'>
                    <h1>{country.name} {country.emoji}</h1>
                    <ul>
                        <li>
                            <span>Столица:</span>
                            <span>{country.capital}</span>
                        </li>
                        <li>
                            <span>Континент:</span>
                            <span>{country.continent}</span>
                        </li>
                        <li>
                            <span>Народное имя страны:</span>
                            <span>{country.native}</span>
                        </li>
                        <li>
                            <span>Языки:</span>
                            <span>{country.languages.map((item) => {
                                return item.native;
                            }).join(', ')}
                            </span>

                        </li>
                        <li>
                            <span>Валюты:</span>
                            {country.currencies.map((item, key) => {
                                return <span key = { key }>{item}</span>;
                            })}
                        </li>
                    </ul>
                </div>
                <div
                    className = 'close'
                    onClick = { (event) => closeModal(event) } >
                </div>
            </Tilt>
        </div>
    );
};
