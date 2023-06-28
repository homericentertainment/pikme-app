import { createStore, combineReducers } from 'redux'
import userReducer from './userReducer'
const rootReducer = combineReducers(
  { count: countReducer }
)
const configureStore = () => {
  return createStore(rootReducer)
}
export default configureStore


