import React, { Component} from 'react';
import GenerateMemorandum from './GenerateMemorandum';
import GenerateWordDocument from './GenerateWordDocument';
import Moment from 'moment';

var LSGETDEPARTMENT;
var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var LSGETPARA2;
var LSGETUNIT;
var LSGETBASE;
var LSGETDATE;
var LSGETDUTYTITLE;
var LSGETRANK;
var LSGETWRITERSNAME;
var LSGETBRANCH;

var extraParagraphs;
var extraParagraphWords = [];

class Memorandum extends Component {
  state = {
    memorandum: [{
      department: "Loading...",
      attn: "Loading...",
      from: "Loading...",
      subject: "Loading...",
      para1: "Loading...",
      unit: "Loading...",
      base: "Loading...",
      date: "Loading...",
      dutytitle: "Loading...",
      rank: "Loading...",
      writersname: "Loading...",
      branch: "Loading..."
    }]
  };
  processExtraParagraphs() {
    extraParagraphs = sessionStorage.getItem("extraParagraphs");
    var x;
    for (x = 0; x <= extraParagraphs; x++) {
      extraParagraphWords[x] = sessionStorage.getItem(x);
      //console.log("Paragraph " + x + " = " + extraParagraphWords[x]);
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.processExtraParagraphs()
      //Set values within review page
      this.setState({
        memorandum: [{
          department: LSGETDEPARTMENT,
          attn: LSGETATTN,
          from: LSGETFROM,
          subject: LSGETSUBJECT,
          para1: LSGETPARA,
          para2: LSGETPARA2,
          unit: LSGETUNIT,
          base: LSGETBASE,
          date: LSGETDATE,
          dutytitle: LSGETDUTYTITLE,
          rank: LSGETRANK,
          writersname: LSGETWRITERSNAME,
          branch: LSGETBRANCH
        }]
      });
    }, 200)
  }
  render() {
      //Set memoranudm variable value to state object
      const {
        memorandum
      } = this.state;
      //Initialize 'Moment' date formatting locale to english
      Moment.locale('en');
      const paragraphItems = [];
      if (sessionStorage.getItem(0) === ''){

      }else {
      for (const [index, value] of extraParagraphWords.entries()) {
        paragraphItems.push( < div key = { index } > { index + 2 }. { value }
            < br / > < br / >
          < /div>)
      }}
    return (
        <div>
          <GenerateMemorandum /> <GenerateWordDocument/>
          <br /><br />
          Department: {LSGETDEPARTMENT}
          <br /><br />
          Unit: {memorandum[0].unit}
          <br /><br />
          Base: {memorandum[0].base}
          <br /><br />
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
          {paragraphItems}
          Duty Position: {memorandum[0].dutytitle}
          <br /><br />
          {memorandum[0].writersname}, {memorandum[0].rank}, {memorandum[0].branch}
          <br /><br />



        </div>

    );
  }
}

class Review extends Component {

  state={
    filled: false
  }

  componentDidMount() {
    setTimeout(() => {
      //Handler for checking if the form has been filled out. If it has then the Memorandum section will be come viewable within the Review class render
      //Get variables from saved input and assign to object
      LSGETDEPARTMENT = sessionStorage.getItem("department");
      LSGETATTN = sessionStorage.getItem("attn");
      LSGETFROM = sessionStorage.getItem("from");
      LSGETSUBJECT = sessionStorage.getItem("subject");
      LSGETPARA = sessionStorage.getItem("para1");
      LSGETPARA2 = sessionStorage.getItem("paragraphArray");
      LSGETUNIT = sessionStorage.getItem("unit");
      LSGETBASE = sessionStorage.getItem("base");
      LSGETDATE = sessionStorage.getItem("date");
      LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
      LSGETRANK = sessionStorage.getItem("rank");
      LSGETWRITERSNAME = sessionStorage.getItem("writersname");
      LSGETBRANCH = sessionStorage.getItem("branch");

      //Convert and resave date in proper format
      LSGETDATE = Moment(LSGETDATE).format('DD MMMM YYYY');
      sessionStorage.setItem("date", LSGETDATE)

      //Verify if theres input as validation to show the results vs fill request
      if(LSGETATTN != undefined){
        this.setState({filled: true})
      }else if(LSGETATTN == undefined){
        console.log(LSGETATTN)
      }
    }, 200)
  }

  render() {
    return (
        <div>
          <h2>Memorandum Review</h2>
          {!this.state.filled && <h2>Please fill out the form and sumbit</h2>}
          {this.state.filled &&
          <Memorandum />}
        </div>

    );
  }
}

export default Review;
