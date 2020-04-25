import React, { Component} from 'react';
import Form from './Form';
import SetTest from './SetTest';
import { Redirect} from 'react-router-dom';
import DoDSeal from '../images/DoD Seal.PNG';

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
    memorandum: [{
      department: "Loading...",
      attn: "Loading...",
      from: "Loading...",
      subject: "Loading...",
      para1: "Loading...",
      para2: "Loading...",
      unit: "Loading...",
      base: "Loading...",
      date: "Loading...",
      dutytitle: "Loading...",
      rank: "Loading...",
      writersname: "Loading...",
      branch: "Loading..."
    }],
    toDashboard: false,
  };

  convertParagraphArray(conversionArray) {
    //console.log("Converting Paragraph Array")
    var text = [];
    var x;
    for (x in conversionArray) {
      text.push(conversionArray[x]);
      sessionStorage.setItem(x, text[x].paraInfo);
      sessionStorage.setItem("extraParagraphs", x);
    }
  }

  handleSubmit = memorandum => {
    //Causes table to change values
    this.setState({
      memorandum: [memorandum]
    });

    //Set individual items as variables into session storage
    var MEMOVAR = memorandum;
    this.convertParagraphArray(MEMOVAR.paragraphArray);
    sessionStorage.setItem("department", MEMOVAR.department.toUpperCase());
    console.log(MEMOVAR);
    sessionStorage.setItem("paragraphArray", JSON.stringify(MEMOVAR.paragraphArray));
    sessionStorage.setItem("attn", MEMOVAR.attn);
    sessionStorage.setItem("from", MEMOVAR.from);
    sessionStorage.setItem("subject", MEMOVAR.subject);
    sessionStorage.setItem("para1", MEMOVAR.para1);
    sessionStorage.setItem("unit", MEMOVAR.unit);
    sessionStorage.setItem("date", MEMOVAR.date);
    sessionStorage.setItem("dutytitle", MEMOVAR.dutytitle);
    sessionStorage.setItem("rank", MEMOVAR.rank);
    sessionStorage.setItem("writersname", MEMOVAR.writersname.toUpperCase());
    sessionStorage.setItem("branch", MEMOVAR.branch);

    //Change secondary sub-line from default when saving
    if(MEMOVAR.base === "Secondary Unit Header Line (Base, etc.)"){
        sessionStorage.setItem("base", " ");
      }else{
      sessionStorage.setItem("base", MEMOVAR.base);
    }

    //Run Image to URL function
    toDataURL(DoDSeal, function(dataUrl) {
      //console.log('RESULT:', dataUrl);
      sessionStorage.setItem('MemoHeaderLogoBase', dataUrl);
    })

    //console.log("All storage actions have been completed, moving to memo review page");

    //True state causes render section to redirect
    this.setState({
      toDashboard: true
    });
  }

  testMemoSubmit = testMemo => {
    //console.log('executed');
    //Set state of table to values received from SetTest.js
    this.setState({
      memorandum: [testMemo]
    });
    //Execute traditional handle submit by passing same variables
    this.handleSubmit(testMemo);
  }

  render() {
      if (this.state.toDashboard === true) {
        return ( < Redirect to = 'memorandum' / > )
      }


    return (

      <div className="w3-center">
      <h2>Memorandum Builder</h2>
          <Form handleSubmit={this.handleSubmit} />
          <SetTest style={{marginTop: '20px'}} testMemoSubmit={this.testMemoSubmit}/>
      </div>

    );
  }
}
export default Home;
