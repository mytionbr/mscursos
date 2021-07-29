import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { categoriaListReducer } from './reducers/categoriaReducers';
import { cursoListReducer } from './reducers/cursoReducers';

const initialState = {}

const reducer = combineReducers({
    cursoList: cursoListReducer,
    categoriaList: categoriaListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store