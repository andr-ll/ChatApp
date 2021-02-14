import { createStore } from 'redux';
import { rootReducer } from '../reducers/index';


const appStore = () => {
    const store = createStore(
        rootReducer,
        undefined
    )
    return store;
}

export default appStore;