// Core
import React, { useState, useEffect } from 'react';

// Instruments
import './styles.css';
import { api } from '../API';
import { delay } from '../instruments';

import { useDebounce } from './useDebounce';
import { ModalWindow } from './ModalWindow';

export const Search = () => {
    const [ filter, setFilter ] = useState('');
    const [ countries, setCountries ]  = useState([]);
    const [ isFetching, setFetching ] = useState(false);
    const [ modal, setModal ] = useState();
    const [ click, setClick ] = useState(false);

    const getCountries = async () => {
        setFetching(true);
        const filteredCountries = await api.getCountries(filter.trim());
        await delay(200);
        setCountries(filteredCountries);
        setFetching(false);
    };

    const regexp = new RegExp(filter, 'g');
    const countriesJSX = countries.map((country) => {
        
        const name = country.name.replace(
            regexp,
            `<span class='highlight'>${ filter }</span>`,
        );
        const  continent = country.continent.replace(
            regexp,
            `<span class='highlight'>${ filter }</span>`,
        );


        return (
            <li key = { country.emoji }>
                <span
                    className = 'country'
                    dangerouslySetInnerHTML = {{
                        __html: `${name}, ${continent}`,
                    }}
                    onClick = { () => {
                        setClick(true);
                        setModal(country);
                    }
                    }
                />
                <span className = 'flag'>{country.emoji}</span>
            </li>
        );
    });

    const debouncedFilter = useDebounce(filter, 200);
    useEffect(() => {
        getCountries();
    }, [ debouncedFilter ]);

    return (
        <section className = 'strange-search'>
            <span className = 'strange'>Странный</span>
            <input
                placeholder = 'Страна или континент'
                style = {{
                    '--inputBorderStyle': isFetching ? 'dashed' : 'solid',
                }}
                type = 'text'
                value = { click ? modal.name : filter }
                onChange = { (event) => setFilter(event.target.value) }
            />
            <span className = 'search'>поиск</span>
            <ul>
                {countriesJSX}
            </ul>
            {click ? <ModalWindow
                country = { modal }
                onClick = { () => {
                    setClick(false);
                    setFilter('');
                } }
            /> : null}
            <b />
        </section>
    );
};
