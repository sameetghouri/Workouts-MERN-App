import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {WorkoutsContextProvider} from './context/WorkoutContext'
import {Provider} from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <WorkoutsContextProvider> */}
    <Provider store={store}>
    <App />
    </Provider>
    {/* </WorkoutsContextProvider> */}
  </React.StrictMode>
);


