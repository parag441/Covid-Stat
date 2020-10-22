import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setFetchedCountries(await fetchCountries());
        };

        fetchApi();
    }, [setFetchedCountries]);
    
    const displayCountries = (
        fetchedCountries.length
            ? (
                fetchedCountries.map(({name}, i) => {
                    return (
                        <option key={i} value={name}>{name}</option>
                    )}
                )
            ) : null
    );

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {displayCountries}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;