import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import CatalogPage from './catalog/CatalogPage';
import Signup from './login/Signup'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './css/styles.css'

function App() {
  let store = createStore(reducer)
  return (
    < Provider store={store} >
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/catalog' component={CatalogPage}></Route>
        </Switch>
      </BrowserRouter>
    </Provider >
  );
}

export default App;
