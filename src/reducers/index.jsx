import { combineReducers } from 'redux';
import Customizer from './customizer.reducer';
import Auth from './auth.reducer';
import UserMenu from './userMenu.reducer';
import SelectOption from './selectOption.reducer';

const reducers = combineReducers({
    auth: Auth,
    userMenu: UserMenu,
    Customizer,
    SelectOption: SelectOption
});

export default reducers;