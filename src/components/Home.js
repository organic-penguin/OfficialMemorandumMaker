import React, { Component } from 'react';
import Form from './Form';
import SetTest from './SetTest';
import { Redirect } from 'react-router-dom';
import DoDSeal from '../images/DoD Seal.PNG'


//This function will convert the iamge into a URL Base64
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}



class Home extends Component {


  state = {
      memorandum: [{"attn":"Loading...", "from":"Loading...", "subject":"Loading...", "para1": "Loading...", "para2": "Loading...", "unit": "Loading...", "date": "Loading...", "dutytitle": "Loading...", "rank": "Loading...", "writersname": "Loading...", "branch": "Loading..." }],
      toDashboard: false,
  };


  convertParagraphArray(conversionArray){
    console.log("Converting Paragraph Array")
    var text = [];
    var x;
    for (x in conversionArray){
      text.push(conversionArray[x]);
      console.log(text[x].paraInfo);
      sessionStorage.setItem(x, text[x].paraInfo);
      sessionStorage.setItem("extraParagraphs", x);
    }

  }

  handleSubmit = memorandum => {
      //Causes table to change values
      this.setState({memorandum: [memorandum]});

      //Set individual items as variables into session storage
      var MEMOVAR = memorandum;
      this.convertParagraphArray(MEMOVAR.paragraphArray);
      sessionStorage.setItem("paragraphArray", MEMOVAR.paragraphArray)
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
      //Run Image to URL function
      toDataURL(DoDSeal, function(dataUrl) {
        console.log('RESULT:', dataUrl);
        sessionStorage.setItem('MemoHeaderLogoBase', dataUrl);
      })




      //console.log("All storage actions have been completed, moving to memo page");
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
      sessionStorage.setItem("paragraphArray", null);
      //Grab variables from session storage
      var LSGETATTN = sessionStorage.getItem("attn");
      var LSGETFROM = sessionStorage.getItem("from");
      var LSGETSUBJECT = sessionStorage.getItem("subject");
      var LSGETPARA = sessionStorage.getItem("para1");
      var LSGETPARA2 = sessionStorage.getItem(2);
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
        para2: LSGETPARA2,
        unit: LSGETUNIT,
        date: LSGETDATE,
        dutytitle: LSGETDUTYTITLE,
        rank: LSGETRANK,
        writersname: LSGETWRITERSNAME,
        branch: LSGETBRANCH
      }]})
      //console.log(this.state);
    }, 500)
  }

  render() {
    if (this.state.toDashboard === true){
      return (<Redirect to='memorandum' />)
    }


    return (

      <div className="w3-center">
      <h2>Memorandum Builder</h2>
          <Form handleSubmit={this.handleSubmit} />
          <SetTest style={{marginTop: '10px', display:'inline-block'}} testMemoSubmit={this.testMemoSubmit}/>
      </div>

    );
  }
}
export default Home;
