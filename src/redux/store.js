import { combineReducers, configureStore } from '@reduxjs/toolkit'
import calendar from './reducers/calendar'


let rootReducer = combineReducers({calendar})

const store = configureStore({ reducer: rootReducer })

store.subscribe(()=> console.log('change'))
window.store = store
export default store