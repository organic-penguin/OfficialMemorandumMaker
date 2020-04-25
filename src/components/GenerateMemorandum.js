import React, { Component} from 'react';
import jsPDF from 'jspdf'
import { isMobile, osName} from "react-device-detect"
//Global Variables
var lineHeight = 1.15,
  margin = 1,
  fontSize = 12,
  ptsPerInch = 72,
  oneLineHeight = (fontSize * lineHeight) / ptsPerInch;
var LSGETDEPARTMENT;
var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var LSGETUNIT;
var LSGETBASE;
var LSGETDATE;
var LSGETDUTYTITLE;
var LSGETRANK;
var LSGETWRITERSNAME;
var LSGETBRANCH;
var LSGETNUMBEROFPARAGRAPHS;
var LSGETADVHEADING;
var LSGETNUMBEROFATTN;
var LSGETNUMBEROFFROM;
let DATEHEIGHT = 1.75 + .14;
let ATTNHEIGHT = DATEHEIGHT + oneLineHeight;
let FROMHEIGHT = ATTNHEIGHT + (oneLineHeight * 2);
let SUBJECTHEIGHT = FROMHEIGHT + (oneLineHeight * 2);
let PARAONEHEIGHT = SUBJECTHEIGHT + (oneLineHeight * 2);
var cursorY = 0;
//Generate pdf object as 'pdf'
var pdf = new jsPDF({
  orientation: 'p',
  unit: "in",
  format: 'letter'
});

function addWrappedText({ text, textWidth, pdf, fontSize = 12, fontType = 'normal', lineSpacing, xPosition, initialYPosition, pageWrapInitialYPosition = 1}) {
  pdf.setFontType(fontType);
  pdf.setFontSize(fontSize);
  var textLines = pdf.splitTextToSize(text, textWidth); // Split the text into lines
  var pageHeight = pdf.internal.pageSize.height - 1; // Get page height, we'll use this for auto-paging. TRANSLATE this line if using units other than `pt`
  cursorY = initialYPosition;
  textLines.forEach(lineText => {
    if (cursorY > pageHeight) { // Auto-paging
      pdf.addPage();
      cursorY = pageWrapInitialYPosition;
    }
    pdf.text(xPosition, cursorY, lineText);
    cursorY += lineSpacing;
  })
}

function insertMultipleParagraphs() {
  LSGETNUMBEROFPARAGRAPHS = sessionStorage.getItem("extraParagraphs");
  var paras;
  if (sessionStorage.getItem(0) === ''){

  }else{
  for (paras = 0; paras <= LSGETNUMBEROFPARAGRAPHS; paras++) {
    var PARAGRAPH = (paras + 2) + '.  ' + (sessionStorage.getItem(paras));
    addWrappedText({
      text: PARAGRAPH, // Put a really long string here
      textWidth: 6.5,
      pdf,
      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: margin, // Text offset from left of document
      initialYPosition: cursorY + oneLineHeight, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });
  }
}}

function insertAdvancedATTN() {
  cursorY = 2.273333333336667;
  LSGETNUMBEROFATTN = sessionStorage.getItem("extraATTN");
  LSGETNUMBEROFFROM = sessionStorage.getItem("extraFROM")
  LSGETADVHEADING = sessionStorage.getItem("adv").split(',')
  if (LSGETNUMBEROFATTN === 0){
  }else{
  for (var index = 0; index < LSGETNUMBEROFATTN; index++) {
    console.log(cursorY)
    var ATTN = LSGETADVHEADING[index]
    addWrappedText({
      text: ATTN, // Put a really long string here
      textWidth: 6.5,
      pdf,
      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: 2.71, // Text offset from left of document
      initialYPosition: cursorY, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });
  }
}}

function insertAdvancedFROM() {
  LSGETNUMBEROFFROM = sessionStorage.getItem("extraFROM")
  LSGETADVHEADING = sessionStorage.getItem("adv").split(',')
  cursorY += oneLineHeight;
  if (LSGETNUMBEROFFROM === 0){
  }else{
  for (var index = 0; index < LSGETNUMBEROFFROM; index++) {
    var ATTN = LSGETADVHEADING[index + 2]
    addWrappedText({
      text: ATTN, // Put a really long string here
      textWidth: 6.5,
      pdf,
      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: 1.61, // Text offset from left of document
      initialYPosition: cursorY, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });
  }
}}


class GenerateMemorandum extends Component {
  generateWrappedMemorandum3 = () => {
    //set Document font information
    //HEADER
    //Insert header DOD logo
    pdf.addImage(sessionStorage.getItem('MemoHeaderLogoBase').toString(), 'PNG', .4, .4, 1, 1)

    //DEPARTMENT
    pdf.setFont("Helvetica")
    pdf.setFontStyle("bold");
    pdf.setFontSize(12);
    pdf.text(LSGETDEPARTMENT, 4.25, .845, null, null, "center");

    //BASE
    pdf.setFontStyle("normal");
    pdf.text(LSGETUNIT, 4.25, 1.039, "center");
    pdf.text(LSGETBASE, 4.25, 1.039 + oneLineHeight, "center");




    //HEADING
    pdf.setFont('Times New Roman');
    //Date
    pdf.text(LSGETDATE, 7.5, DATEHEIGHT, null, null, "right");


    //MEMORANDUM FOR:
    pdf.text("MEMORANDUM FOR  " + LSGETATTN, 1, ATTNHEIGHT);
    insertAdvancedATTN();

    pdf.text("FROM:  " + LSGETFROM, 1, cursorY += oneLineHeight);
    insertAdvancedFROM();


    pdf.text("SUBJECT:  " + LSGETSUBJECT, 1, cursorY += oneLineHeight);
    //PARAGRAPHS
    var PARAGRAPH1 = '1.  ' + LSGETPARA;
    addWrappedText({
      text: PARAGRAPH1, // Put a really long string here
      textWidth: 6.5,
      pdf,
      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: margin, // Text offset from left of document
      initialYPosition: cursorY += oneLineHeight + oneLineHeight, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });


    //2-X paragraphs
    insertMultipleParagraphs(LSGETNUMBEROFPARAGRAPHS);


    //SIGNATURE BLOCK
    //var SIGNATUREHEIGHT = PARAONEHEIGHT + PARA1TextHeight + (oneLineHeight * 5);
    pdf.text(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH, 4.5, cursorY + (oneLineHeight * 5));
    pdf.text(LSGETDUTYTITLE, 4.5, cursorY + (oneLineHeight * 6));
    pdf.setProperties({
      title: LSGETSUBJECT,
    })


    //OS Detection for movile and various browsers. Generation incurrs errors depending on browser
    if (osName === 'Mac OS') {
      var string = pdf.output('datauristring');
      var x = window.open();
      x.document.open();
      x.document.location = string;
    } else if (isMobile) {
      window.open(pdf.output('bloburl'))
    } else {
      var elseString = pdf.output('bloburi');
      var embed = "<iframe width='100%' type='application/pdf' height='100%' src='" + elseString + "'/>"
      var elseX = window.open();
      elseX.document.open();
      elseX.document.write(embed);
      elseX.document.close();
    }
    //Reinitialize the pdf to clear previous states
    pdf = new jsPDF({
      orientation: 'p',
      unit: "in",
      format: 'letter'
    });
  }


fillVariables() {
    LSGETDEPARTMENT = sessionStorage.getItem("department");
    LSGETATTN = sessionStorage.getItem("attn");
    LSGETFROM = sessionStorage.getItem("from");
    LSGETSUBJECT = sessionStorage.getItem("subject");
    LSGETPARA = sessionStorage.getItem("para1");
    LSGETUNIT = sessionStorage.getItem("unit");
    LSGETBASE = sessionStorage.getItem("base");
    LSGETDATE = sessionStorage.getItem("date");
    LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
    LSGETRANK = sessionStorage.getItem("rank");
    LSGETWRITERSNAME = sessionStorage.getItem("writersname");
    LSGETBRANCH = sessionStorage.getItem("branch");
  }
  render() {
    this.fillVariables();
    return (<div style={{display:'inline'}}>
      <button style={{margin:'5px'}} onClick={this.generateWrappedMemorandum3} type="submit">
        Generate PDF
      </button>
    </div>)
  }
}

export default GenerateMemorandum;
