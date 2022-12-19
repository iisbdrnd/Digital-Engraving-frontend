import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { timezoneList, countryList, currencyList } from '../../../api/generalUrl'

export const Timezone = () =>{
    const [timezones, setTimezones] = useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASEURL}/${timezoneList}`)
            .then(response => {
                setTimezones(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    return (
        timezones && timezones.length ?
        (timezones.map((data) => (<option key={data.id} value={data.id}>{data.name}</option>)))
        : 
        (<option value="">No Data</option>)
    );
}

export const Country = () =>{
    const [countries, setCountries] = useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASEURL}/${countryList}`)
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    return (
        countries && countries.length ?
        (countries.map((data) => (<option key={data.id} value={data.id}>{data.name}</option>)))
        : 
        (<option value="">No Data</option>)
    );
}
export const Currency = () =>{
    const [currencies, setCurrencies] = useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASEURL}/${currencyList}`)
            .then(response => {
                setCurrencies(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    return (
        currencies && currencies.length ?
        (currencies.map((data, key) => (<option key={key} value={data.id}>{data.currency_name}</option>)))
        : 
        (<option value="">No Data</option>)
    );
}
