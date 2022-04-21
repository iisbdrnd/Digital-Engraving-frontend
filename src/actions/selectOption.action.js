import {GET_COUNTRY_LIST} from '../constant/actionTypes';
import Country from '../data/country';

export const selectCountryList = (Country) => ({
    type: GET_COUNTRY_LIST,
    payload: Country
});
