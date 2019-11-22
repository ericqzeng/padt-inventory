import React from 'react';
import logo from './logo.svg';
import './App.css';
import CatalogPage from './catalog/CatalogPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer'

function App() {
  let store = createStore(reducer)
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Provider store={store}>
      <CatalogPage></CatalogPage>
    </Provider>
  );
}

export default App;
