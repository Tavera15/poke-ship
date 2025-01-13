import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import tokenReducer from './Features/TokenSlice'
import { thunk } from 'redux-thunk'

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
}, applyMiddleware(thunk));