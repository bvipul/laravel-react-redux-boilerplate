export const loadState = () => {
    try {
        let serializedState = localStorage.getItem('state');

        if(!serializedState) return undefined;

        return JSON.parse(serializedState);
    } catch(err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        let serializedState = JSON.stringify(state);

        localStorage.setItem('state', serializedState);
    } catch(error) {

    }
}