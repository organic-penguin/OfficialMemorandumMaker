import React, { Component } from 'react';
import MemorandumDataClass from './Table'
import Form from './Form'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';



class Home extends Component {

  state = {
      memorandum: [{"attn":"Loading...", "from":"Loading...", "subject":"Loading...", "para1": "Loading..." }],
      toDashboard: false,
  };

  handleSubmit = memorandum => {
      this.setState({memorandum: [memorandum]});
      console.log("this is memorandum " + memorandum);
      console.log("memorandum 1 " + memorandum.attn);
      console.log("memorandum 2 " + memorandum.from);
      console.log("memorandum 1 " + memorandum.subject);
      console.log("memorandum 2 " + memorandum.para1);
      var MEMOVAR = memorandum;
      sessionStorage.setItem(0, memorandum);
      console.log('memovar ' + MEMOVAR);
      console.log('memovar 1 ' + MEMOVAR.attn);
      console.log('memovar 2 ' + MEMOVAR.from);
      sessionStorage.setItem(1, MEMOVAR);
      sessionStorage.setItem(2, MEMOVAR.attn);
      sessionStorage.setItem(3, MEMOVAR.from);
      sessionStorage.setItem(4, MEMOVAR.subject);
      sessionStorage.setItem(5, MEMOVAR.para1);
      console.log(sessionStorage.getItem(0));
      console.log(sessionStorage.getItem(1));
      console.log(sessionStorage.getItem(2));
      console.log(sessionStorage.getItem(3));
      console.log(sessionStorage.getItem(4));
      console.log(sessionStorage.getItem(5));
      console.log("All storage actions have been completed, moving to memo page");
      this.setState({toDashboard: true});

  }

  clearForm = memorandum => {
      console.log("clearForm button pressed");
      this.setState({memorandum: [{"attn":" ", "from":" ", "subject":" ", "para1": " "  }]});
      sessionStorage.clear();
      alert("The information in your memorandum has been cleared.");
  }

  componentDidMount(){
    setTimeout(() => {
      var LSGETATTN = sessionStorage.getItem(2);
      var LSGETFROM = sessionStorage.getItem(3);
      var LSGETSUBJECT = sessionStorage.getItem(4);
      var LSGETPARA = sessionStorage.getItem(5);
      console.log('Retrieved from sessionStorage ATTN = ' + LSGETATTN);
      console.log('Retrieved from sessionStorage from = ' + LSGETFROM);

      console.log(this.state);
      this.setState({memorandum: [{"attn": LSGETATTN, "from": LSGETFROM, "subject": LSGETSUBJECT, "para1": LSGETPARA}]})
      console.log(this.state);
    }, 1000)
  }

  render() {
    const { memorandum } = this.state;
    if (this.state.toDashboard === true){
      return (<Redirect to='memorandum' />)
    }
    return (
      <div className="container">
      <h2>Memorandum Builder</h2>
          <MemorandumDataClass memorandumData={memorandum}  />
          <h3>Add New</h3>
          <Form handleSubmit={this.handleSubmit} />
          <button onClick={this.clearForm} type="submit">
              Clear Form
          </button>
      </div>

    );
  }
}
export default Home;
