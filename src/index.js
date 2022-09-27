import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DiscussStore from "./store/DiscussStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        discuss: new DiscussStore()}}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

