import React, { Component } from 'react';
import GenerateMemorandum from './GenerateMemorandum';
import Moment from 'moment'
import About from './About'

var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var LSGETUNIT;
var LSGETDATE;
var LSGETDUTYTITLE;
var LSGETRANK;
var LSGETWRITERSNAME;
var LSGETBRANCH;

class Memorandum extends Component {

  state = {
      memorandum: [{"attn":"Loading...", "from":"Loading...", "subject":"Loading...", "para1": "Loading...", "unit": "Loading...", "date": "Loading...", "dutytitle": "Loading...", "rank": "Loading...", "writersname": "Loading...", "branch": "Loading..." }],
      toDashboard: false,
      defaultMemo: [{
        attn: 'Insert Receiver of Memorandum Here',
        from: 'Insert Your Information Here',
        subject: 'Insert Subject Here',
        para1: 'Insert first Paragraph',
        unit: 'Type your Unit Here',
        date: 'Select Date of Memorandum',
        dutytitle: 'Enter your Duty Title Here',
        rank: 'Select Your Rank',
        writersname: "What is Your Name? FIRST MI. LAST",
        branch: "Select Your Branch of Service"
        }]
  };


  eraseStateIfDefault() {
    const { defaultMemo } = this.state;
    if (LSGETATTN === defaultMemo[0].attn){
      LSGETATTN = '';
    }
    if (LSGETFROM === defaultMemo[0].from){
      LSGETFROM = '';
    }
    if (LSGETSUBJECT === defaultMemo[0].subject){
      LSGETSUBJECT = '';
    }
    if (LSGETPARA === defaultMemo[0].para1){
      LSGETPARA = '';
    }
  }




  componentDidMount(){
    setTimeout(() => {
      LSGETATTN = sessionStorage.getItem("attn");
      LSGETFROM = sessionStorage.getItem("from");
      LSGETSUBJECT = sessionStorage.getItem("subject");
      LSGETPARA = sessionStorage.getItem("para1");
      LSGETUNIT = sessionStorage.getItem("unit");
      LSGETDATE = sessionStorage.getItem("date");
      LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
      LSGETRANK = sessionStorage.getItem("rank");
      LSGETWRITERSNAME = sessionStorage.getItem("writersname");
      LSGETBRANCH = sessionStorage.getItem("branch");

      this.eraseStateIfDefault();
      this.setState({memorandum: [{attn: LSGETATTN, from: LSGETFROM, subject: LSGETSUBJECT, para1: LSGETPARA, unit: LSGETUNIT, date: LSGETDATE, dutytitle: LSGETDUTYTITLE, rank: LSGETRANK, writersname: LSGETWRITERSNAME, branch:LSGETBRANCH}]});
    }, 500)
  }



  render() {
    const { memorandum } = this.state;
    Moment.locale('en');
    var dt = '2016-05-02T00:00:00';

    return (
        <div>
          <h2>Memorandum Review</h2>

          <GenerateMemorandum />
          DATE: {Moment(memorandum[0].date).format('DD MMMM YYYY')}
          <br /><br />
          MEMORANDUM FOR  {memorandum[0].attn}
          <br /><br />
          FROM:  {memorandum[0].from}
          <br /><br />
          SUBJECT:  {memorandum[0].subject}
          <br /><br />
          1. {memorandum[0].para1}
          <br /><br />
          Unit: {memorandum[0].unit}
          <br /><br />
          Duty Position: {memorandum[0].dutytitle}
          <br /><br />
          {memorandum[0].writersname}, {memorandum[0].rank}, {memorandum[0].branch}
          <br /><br />



        </div>

    );
  }
}

export default Memorandum;
