import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from '../store/store.js'
import {Provider} from'react-redux'
import { getPost } from '../reducers/BlogReducer.js';
import { getAllFeedbacks } from '../reducers/FeedbackSlice.js'
import { getUser } from '../reducers/authSlice.js'

store.dispatch(getUser())
store.dispatch(getPost())
store.dispatch(getAllFeedbacks())
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
