import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import CardData from './card-data/carddata';


//import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


let cardarray = Object.values(CardData).map((card)=>
    card
);
const store = configureStore({
    draftedCards:[],
    undraftedCards:cardarray
});
ReactDOM.render(
    <Provider store={store}>
        <App />np
    </Provider>,
    document.getElementById('root'));
//registerServiceWorker();
