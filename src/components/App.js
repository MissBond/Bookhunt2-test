import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import BookDetailPage from './BookDetailPage';

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/book/:id' component={BookDetailPage} />
    </div>
  </Router>
)
export default App;
