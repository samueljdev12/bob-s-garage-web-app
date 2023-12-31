import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from '../store/store.js'
import {Provider} from'react-redux'
import { getAllFeedbacks } from '../reducers/FeedbackSlice.js';
import { getUser } from '../reducers/authSlice.js';
import { getServices } from '../reducers/ServiceSlice.js'

store.dispatch(getUser());
store.dispatch(getAllFeedbacks());
store.dispatch(getServices());
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
