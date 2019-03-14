import {useState, useEffect} from 'react';


export const useDebounce = (value, delay) => {
    const  [ debouncedValue, setDebounceValue ] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [ value ]);

    return debouncedValue;
};
