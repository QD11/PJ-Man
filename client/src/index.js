import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import actionCable from 'actioncable'
import store from '../src/redux/store'
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable') // change to whatever port your server uses
// CableApp.cable = actionCable.createConsumer('/cable')
export const ActionCableContext = createContext()

ReactDOM.render(
  <Provider store={store}> 
    <ActionCableContext.Provider value={CableApp.cable}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActionCableContext.Provider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
