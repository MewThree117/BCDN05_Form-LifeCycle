import { combineReducers, createStore } from 'redux'
import { qlsvReducer } from './QLSVReducer'

const rootReducer = combineReducers({
    qlsvReducer,
})

export const store = createStore(rootReducer)