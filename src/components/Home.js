import React, { Component } from 'react';
import MemorandumDataClass from './Table';
import Form from './Form';
import SetTest from './SetTest';
import { Redirect } from 'react-router-dom';



class Home extends Component {


  state = {
      memorandum: [{"attn":"Loading...", "from":"Loading...", "subject":"Loading...", "para1": "Loading...", "unit": "Loading...", "date": "Loading...", "dutytitle": "Loading...", "rank": "Loading...", "writersname": "Loading...", "branch": "Loading..." }],
      toDashboard: false,
  };

  handleSubmit = memorandum => {
      //Causes table to change values
      this.setState({memorandum: [memorandum]});

      //Set individual items as variables into session storage
      var MEMOVAR = memorandum;
      sessionStorage.setItem(0, memorandum);
      console.log('memovar ' + MEMOVAR);
      console.log('memovar 1 ' + MEMOVAR.attn);
      console.log('memovar 2 ' + MEMOVAR.from);
      sessionStorage.setItem(1, MEMOVAR);
      sessionStorage.setItem("attn", MEMOVAR.attn);
      sessionStorage.setItem("from", MEMOVAR.from);
      sessionStorage.setItem("subject", MEMOVAR.subject);
      sessionStorage.setItem("para1", MEMOVAR.para1);
      sessionStorage.setItem("unit", MEMOVAR.unit);
      sessionStorage.setItem("date", MEMOVAR.date);
      sessionStorage.setItem("dutytitle", MEMOVAR.dutytitle);
      sessionStorage.setItem("rank", MEMOVAR.rank);
      sessionStorage.setItem("writersname", MEMOVAR.writersname);
      sessionStorage.setItem("branch", MEMOVAR.branch);
      console.log("All storage actions have been completed, moving to memo page");
      //True state causes render section to redirect
      this.setState({toDashboard: true});

  }


  testMemoSubmit = testMemo => {
    console.log('executed');
      //Set state of table to values received from SetTest.js
      this.setState({memorandum: [testMemo]});
      //Execute traditional handle submit by passing same variables
      this.handleSubmit(testMemo);
  }




  componentDidMount(){
    setTimeout(() => {
      //Grab variables from session storage
      var LSGETATTN = sessionStorage.getItem("attn");
      var LSGETFROM = sessionStorage.getItem("from");
      var LSGETSUBJECT = sessionStorage.getItem("subject");
      var LSGETPARA = sessionStorage.getItem("para1");
      var LSGETUNIT = sessionStorage.getItem("from");
      var LSGETDATE = sessionStorage.getItem("date");
      var LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
      var LSGETRANK = sessionStorage.getItem("rank");
      var LSGETWRITERSNAME = sessionStorage.getItem("writersname");
      var LSGETBRANCH = sessionStorage.getItem("branch");

      //Change table values to what is pulled form session storage
      this.setState({memorandum: [{attn: LSGETATTN,
        from: LSGETFROM,
        subject: LSGETSUBJECT,
        para1: LSGETPARA,
        unit: LSGETUNIT,
        date: LSGETDATE,
        dutytitle: LSGETDUTYTITLE,
        rank: LSGETRANK,
        writersname: LSGETWRITERSNAME,
        branch: LSGETBRANCH
      }]})
      console.log(this.state);
    }, 1000)
  }

  render() {
    const { memorandum } = this.state;
    if (this.state.toDashboard === true){
      return (<Redirect to='memorandum' />)
    }


    return (

      <div className="w3-center">
      <h2>Memorandum Builder</h2>
          <Form handleSubmit={this.handleSubmit} />
          <MemorandumDataClass memorandumData={memorandum}  />
          <SetTest style={{marginTop: '10px', display:'inline-block'}} testMemoSubmit={this.testMemoSubmit}/>
      </div>

    );
  }
}
export default Home;
