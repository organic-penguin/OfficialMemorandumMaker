import React, {
  Component
} from 'react';
import GenerateMemorandum from './GenerateMemorandum';
import GenerateWordDocument from './GenerateWordDocument'
import Moment from 'moment'
var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var LSGETPARA2;
var LSGETUNIT;
var LSGETDATE;
var LSGETDUTYTITLE;
var LSGETRANK;
var LSGETWRITERSNAME;
var LSGETBRANCH;
var LSGETLOGO;
var extraParagraphs;
var extraParagraphWords = [];

class Memorandum extends Component {
  state = {
    memorandum: [{
      "attn": "Loading...",
      "from": "Loading...",
      "subject": "Loading...",
      "para1": "Loading...",
      "unit": "Loading...",
      "date": "Loading...",
      "dutytitle": "Loading...",
      "rank": "Loading...",
      "writersname": "Loading...",
      "branch": "Loading..."
    }],
    toDashboard: false,
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
          attn: LSGETATTN,
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
        paragraphItems.push( < div key = {
          index
        } > {
          index + 2
        }. {
          value
        } < br / > < br / > < /div>)
      }}
    return (
        <div>
          <GenerateMemorandum /> <GenerateWordDocument/>
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

class Review extends Component {

  state={
    filled: false
  }

  componentDidMount() {
    setTimeout(() => {
      //Handler for checking if the form has been filled out. If it has then the Memorandum section will be come viewable within the Review class render
      //Get variables from saved input and assign to object
      LSGETATTN = sessionStorage.getItem("attn");
      LSGETFROM = sessionStorage.getItem("from");
      LSGETSUBJECT = sessionStorage.getItem("subject");
      LSGETPARA = sessionStorage.getItem("para1");
      LSGETPARA2 = sessionStorage.getItem("paragraphArray");
      LSGETUNIT = sessionStorage.getItem("unit");
      LSGETDATE = sessionStorage.getItem("date");
      LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
      LSGETRANK = sessionStorage.getItem("rank");
      LSGETWRITERSNAME = sessionStorage.getItem("writersname");
      LSGETBRANCH = sessionStorage.getItem("branch");
      LSGETLOGO = sessionStorage.getItem("MemoHeaderLogoBase");

      if(LSGETATTN != undefined){
        console.log("Date detected")
        this.setState({filled: true})
      }else if(LSGETATTN == undefined){
        console.log(LSGETATTN)
        console.log("date not detected")
      }
    }, 100)
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
