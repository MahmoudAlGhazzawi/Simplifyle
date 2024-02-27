import './App.css'

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header.jsx';
import Start from './start.jsx';
import Input from './input.jsx';
import Settings from './settings.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/input" component={Input} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
}

export default App;

