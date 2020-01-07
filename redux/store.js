import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';


let store = createStore( rootReducer );


export default store;