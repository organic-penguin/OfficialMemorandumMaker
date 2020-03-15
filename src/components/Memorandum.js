import React, { Component } from 'react';
import MemorandumDataClass from './Table'
import Form from './Form'


var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var message;

class Memorandum extends Component {

  state = {
      memorandum: [{attn:"Loading...", from:"Loading...", subject:"Loading...", para1: "Loading..." }],
      toDashboard: false,
      defaultMemo: [{
        attn: 'Insert Receiver of Memorandum Here',
        from: 'Insert Your Information Here',
        subject: 'Insert Subject Here',
        para1: 'Insert first Paragraph',}]
  };


  eraseStateIfDefault() {
    const { defaultMemo } = this.state;
    if (LSGETATTN == defaultMemo[0].attn){
      LSGETATTN = '';
    }
    if (LSGETFROM == defaultMemo[0].from){
      LSGETFROM = '';
    }
    if (LSGETSUBJECT == defaultMemo[0].subject){
      LSGETSUBJECT = '';
    }
    if (LSGETPARA == defaultMemo[0].para1){
      LSGETPARA = '';
    }
  }


  componentDidMount(){
    setTimeout(() => {
      LSGETATTN = sessionStorage.getItem(2);
      LSGETFROM = sessionStorage.getItem(3);
      LSGETSUBJECT = sessionStorage.getItem(4);
      LSGETPARA = sessionStorage.getItem(5);
      this.eraseStateIfDefault(message);
      this.eraseStateIfDefault();
      this.setState({memorandum: [{attn: LSGETATTN, from: LSGETFROM, subject: LSGETSUBJECT, para1: LSGETPARA}]});
    }, 500)
  }



  render() {
    const { memorandum } = this.state;
    return (
        <div>
          <h2>Memorandum</h2>
          <MemorandumDataClass memorandumData={memorandum}  />
          <h3>Add New</h3>
          MEMORANDUM FOR  {memorandum[0].attn}
          <br />
          FROM:  {memorandum[0].from}
          <br />
          SUBJECT:  {memorandum[0].subject}
          <br />
          1. {memorandum[0].para1}
          <br />
        </div>
    );
  }
}

export default Memorandum;
