import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Memorandum from './components/Memorandum';
import GenerateMemorandum from './components/GenerateMemorandum';



class App extends Component {

  AirForceWriterLink(){
      window.open("http://www.airforcewriter.com/officialmemorandum.htm");
  }
  TheTongueAndQuillLink(){
      window.open("https://static.e-publishing.af.mil/production/1/saf_cio_a6/publication/afh33-337/afh33-337.pdf");
  }


  render() {
    return (
    <Router>
        <div>
          <h2>Wecome to the Official Memorandum Maker</h2>
          <nav className="navbar w3-round-xlarge navbar-expand-lg navbar-light" style={{boxShadow: '0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19)', backgroundColor: '464a4e'}}>
          <ul className="w3-center" style={{flex:'auto', padding:'0', margin:'0'}}>
            <Link to={'/OfficialMemorandumMaker/'}><button style={{margin: '0px', marginLeft: '5px', marginRight: '5px', height: '100%', display: 'inline'}}> Home </button></Link>
            <Link to={'/OfficialMemorandumMaker/memorandum'}><button style={{margin: '0px', marginLeft: '5px', marginRight: '5px', height: '100%', display: 'inline'}}> Review </button></Link>
            <button style={{margin: '0px', marginLeft: '5px', marginRight: '5px', height: '100%', display: 'inline'}} form="setTestForm" type="submit">Set Test Parameters</button>
            <button style={{margin: '0px', marginLeft: '5px', marginRight: '5px', height: '100%', display: 'inline'}} onClick={this.AirForceWriterLink} type="button">Air Force Writer</button>
            <button style={{margin: '0px', marginLeft: '5px', marginRight: '5px', height: '100%', display: 'inline'}} onClick={this.TheTongueAndQuillLink} type="button">The Tongue and Quill</button>
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
