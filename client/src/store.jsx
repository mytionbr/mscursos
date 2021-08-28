import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { alunoFindCursosReducer, alunoFindReducer, alunoNotaCreateReducer, alunoNotaDeleteReducer, alunoNotaDetailsReducer, alunoNotaUpdateReducer, alunoRegisterReducer, alunoSigninReducer } from './reducers/alunoReducers';
import { assinaturaCreateReducer } from './reducers/assinaturaReducers';
import { aulaCreateReducer, aulaDeleteReducer, aulaDetailsReducer, aulaFindReducer, aulaUpdateReducer } from './reducers/aulaReducers';
import { categoriaListReducer } from './reducers/categoriaReducers';
import { cursoCreateReducer, cursoDeleteReducer, cursoDetailsReducer, cursoFindReducer, cursoInformaionsReducer, cursoListReducer, cursoProfessorReducer, cursoUpdateReducer } from './reducers/cursoReducers';
import { matriculaCreateReducer, matriculaDeleteReducer, matriculaFindReducer } from './reducers/matriculaReducers';
import { professorAssignmentsReducer, professorDetailsReducer, professorSigninReducer, professorUpdateProfileReducer } from './reducers/professorReducers';

const initialState = {
    professorSignin:{
        professorInfo: localStorage.getItem('professorInfo')
            ? JSON.parse(localStorage.getItem('professorInfo'))
            : null
    },
    alunoSignin:{
        alunoInfo: localStorage.getItem('alunoInfo')
            ? JSON.parse(localStorage.getItem('alunoInfo'))
            : null
    },
}

const reducer = combineReducers({
    cursoList: cursoListReducer,
    categoriaList: categoriaListReducer,
    cursoFind: cursoFindReducer,
    alunoSignin: alunoSigninReducer,
    professorSignin: professorSigninReducer,
    professorAssignments: professorAssignmentsReducer,
    cursoProfessor:cursoProfessorReducer,
    cursoCreate:cursoCreateReducer,
    cursoDetails:cursoDetailsReducer,
    cursoUpdate: cursoUpdateReducer,
    cursoDelete: cursoDeleteReducer,
    aulaFind:aulaFindReducer,
    aulaDelete:aulaDeleteReducer,
    aulaCreate:aulaCreateReducer,
    aulaDetails:aulaDetailsReducer,
    aulaUpdate:aulaUpdateReducer,
    alunoFind:alunoFindReducer,
    notaCreate:alunoNotaCreateReducer,
    notaDetails: alunoNotaDetailsReducer,
    notaUpdate:alunoNotaUpdateReducer,
    notaDelete:alunoNotaDeleteReducer,
    professorDetails:professorDetailsReducer,
    professorUpdateProfile:professorUpdateProfileReducer,
    alunoRegister:alunoRegisterReducer,
    assinaturaCreate:assinaturaCreateReducer,
    cursoInfomations:cursoInformaionsReducer,
    matriculaFind:matriculaFindReducer,
    matriculaCreate: matriculaCreateReducer,
    matriculaDelete:matriculaDeleteReducer,
    alunoFindCursos:alunoFindCursosReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store