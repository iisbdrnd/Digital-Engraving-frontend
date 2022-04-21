import {SET_USER_MENU} from '../constant/actionTypes';

const INIT_STATE = {
    hasMenu: false,
    userMenus: {}
}

const UserMenu = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_USER_MENU:
            return {...state, hasMenu: true, userMenus: action.payload };

        default:
            return state;
    }
}

export default UserMenu;