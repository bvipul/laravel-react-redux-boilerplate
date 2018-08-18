import { AUTH_LOGIN, AUTH_LOGOUT } from '../action-types';
import Server from '../../Helpers/Server';

const user = {
    id: null,
    name: null,
    email: null,
    createdAt: null,
    updatedAt: null
};

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return authLogin(state, action.payload);
        case AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
};

const authLogin = (state, payload) => {
    const jwtToken = payload.token;
    const user = payload.user;

    if (!!payload.user.is_admin) {
      localStorage.setItem('is_admin', true);
    } else {
      localStorage.setItem('is_admin', false);
    }
    
    localStorage.setItem('jwt_token', jwtToken);

    Server.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    
    state = Object.assign({}, state, {
      isAuthenticated: true,
      isAdmin: localStorage.getItem('is_admin') === 'true',
      user
    });
    
    return state;

};

const authLogout = (state) => {
    
    localStorage.removeItem('jwt_token');
    localStorage.setItem('is_admin', false);
    
    state = Object.assign({}, state, {
        isAuthenticated: false,
        isAdmin: false,
        user
    });
    
    return state;
};