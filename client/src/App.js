import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import View from './View';
import './App.css';
import Fullview from './Fullview';


const App = () => {
  document.addEventListener('contextmenu', event => event.preventDefault());
  return (
      <Router>
          <Switch>
             <Route path="/" exact component={Home} />
             <Route path="/view" exact component={View} />
             <Route path="/fullview" exact component={Fullview} />
          </Switch>
      </Router>
  );
}

export default App;
