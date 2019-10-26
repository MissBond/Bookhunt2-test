import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import BookDetailPage from './BookDetailPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />

    </Switch>
  </Router>
)
export default App;
