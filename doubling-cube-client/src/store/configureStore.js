import {createStore, applyMiddleware} from 'redux';
import dummyReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
        dummyReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        //initialState,
        //applyMiddleware(thunk)
    );
}
