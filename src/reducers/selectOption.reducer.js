import { GET_COUNTRY_LIST, GET_TIMEZONE_LIST } from '../constant/actionTypes';
import Countries from '../data/country';
import Timezones from '../data/timezone';
import Currencies from '../data/currency';

const INIT_STATE = {
    countryList : Countries,
    timezoneList: Timezones,
    currencyList: Currencies,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_COUNTRY_LIST:
            return { ...state, countryList: action.payload };

        case GET_TIMEZONE_LIST:
            return { ...state, timezoneList: action.payload };

        default:
            return state;   
    }
}
