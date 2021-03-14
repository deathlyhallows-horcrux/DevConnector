import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // no need to mention index.js since it is the start of every folder. rootReducer calls the combineReducers() in index

const middleware = [thunk];


//only reducer can write to the store createStore(reducer, state object, state enhancer)
//redux preserves the previous state and current state of the data
//the createStore calls for the reducers when the application starts up

//app.js loads and call for store because of the provider and then createStore is called which in turn calls the reducer function
const store = createStore(rootReducer, {},
                         compose(applyMiddleware(...middleware),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;