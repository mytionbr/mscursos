import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { alunoSigninReducer } from './reducers/alunoReducers';
import { categoriaListReducer } from './reducers/categoriaReducers';
import { cursoFindReducer, cursoListReducer } from './reducers/cursoReducers';
import { professorSigninReducer } from './reducers/professorReducers';

const initialState = {}

const reducer = combineReducers({
    cursoList: cursoListReducer,
    categoriaList: categoriaListReducer,
    cursoFind: cursoFindReducer,
    alunoSignin: alunoSigninReducer,
    professorSignin: professorSigninReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store