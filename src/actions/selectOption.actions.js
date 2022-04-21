import { GET_COUNTRY_LIST, GET_TIMEZONE_LIST } from '../constant/actionTypes';
import Countries from '../data/country';
import Timezones from '../data/timezone';

export const setCountryList = () => ({
    type: GET_COUNTRY_LIST,
    payload: Countries
});

export const setTimezoneList = () => ({
    type: GET_TIMEZONE_LIST,
    payload: Timezones
});