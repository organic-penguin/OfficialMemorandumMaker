import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Memorandum from './components/Memorandum';
import GenerateMemorandum from './components/GenerateMemorandum';



class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Wecome to the Official Memorandum Maker</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/OfficialMemorandumMaker/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/OfficialMemorandumMaker/memorandum'} className="nav-link">Memorandum</Link></li>
            <li><Link to={'/OfficialMemorandumMaker/about'} className="nav-link">About</Link></li>
            <button style={{marginLeft: '5px', marginRight: '5px'}} form="setTestForm" type="submit">Set Test</button>


          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/OfficialMemorandumMaker/' component={Home} />
              <Route path='/OfficialMemorandumMaker/memorandum' component={Memorandum} />
              <Route path='/OfficialMemorandumMaker/about' component={About} />
              <Route path='/OfficialMemorandumMaker/generatememorandum' component={GenerateMemorandum} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
