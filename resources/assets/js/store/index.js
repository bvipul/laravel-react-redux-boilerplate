import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from '../Helpers/persistState';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState
);

// To persist the state of auth property to localStorage
store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});

export default store;
