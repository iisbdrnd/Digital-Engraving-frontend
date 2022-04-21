const INIT_STATE = {
    loggedIn: false,
    adminLoggedIn: false,
    user: {}
}

const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        case 'SET_LOGOUT':
            return {
                ...state,
                loggedIn: false,
                user: {}
            };
        //ADMIN USER
        case 'SET_ADMIN_LOGIN':
            return {
                ...state,
                adminLoggedIn: true,
                user: action.payload
            };
        case 'SET_ADMIN_LOGOUT':
            return {
                ...state,
                adminLoggedIn: false,
                user: {}
            };
        // USER
        case 'SET_USER_LOGIN':
            return {
                ...state,
                userLoggedIn: true,
                user: action.payload
            };
        case 'SET_USER_LOGOUT':
            return {
                ...state,
                userLoggedIn: false,
                user: {}
            };
    
        default:
            return state;
    }
}

export default Auth;