import React, {
  Component
} from 'react';
import jsPDF from 'jspdf'
import {
  isMobile,
  osName
} from "react-device-detect"
//Global Variables
var lineHeight = 1.15,
  margin = 1,
  fontSize = 12,
  ptsPerInch = 72,
  oneLineHeight = (fontSize * lineHeight) / ptsPerInch;
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
var LSGETNUMBEROFPARAGRAPHS;
let DATEHEIGHT = 1.75 + oneLineHeight;
let ATTNHEIGHT = DATEHEIGHT + oneLineHeight;
let FROMHEIGHT = ATTNHEIGHT + (oneLineHeight * 2);
let SUBJECTHEIGHT = FROMHEIGHT + (oneLineHeight * 2);
let PARAONEHEIGHT = SUBJECTHEIGHT + (oneLineHeight * 2);
var cursorY;
//Generate pdf object as 'pdf'
var pdf = new jsPDF({
  orientation: 'p',
  unit: "in",
  format: 'letter'
});

function addWrappedText({
  text,
  textWidth,
  pdf,
  fontSize = 12,
  fontType = 'normal',
  lineSpacing = oneLineHeight,
  xPosition = margin,
  initialYPosition = PARAONEHEIGHT,
  pageWrapInitialYPosition = 1
}) {
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
class GenerateMemorandum extends Component {
  state = {
    dateHeight: 1.9166,
    attnHEIGHT: this.dateHeight
  }
  generateWrappedMemorandum2 = () => {
    //set Document font information
    //HEADER
    //Insert header DOD logo
    pdf.addImage(sessionStorage.getItem('MemoHeaderLogoBase').toString(), 'PNG', .4, .4, 1, 1)
    pdf.setFont("Helvetica")
    pdf.setFontStyle("bold");
    pdf.setFontSize(12);
    pdf.text("DEPARTMENT OF THE AIR FORCE", 4.25, .845, null, null, "center");
    pdf.setFontStyle("normal");
    pdf.text(LSGETUNIT, 4.25, 1.039, "center");
    //BODY
    pdf.setFont('Times New Roman');
    pdf.text(LSGETDATE, 7.5, DATEHEIGHT, null, null, "right");
    pdf.text("MEMORANDUM FOR  " + LSGETATTN, 1, ATTNHEIGHT);
    pdf.text("FROM:  " + LSGETFROM, 1, FROMHEIGHT);
    pdf.text("SUBJECT:  " + LSGETSUBJECT, 1, SUBJECTHEIGHT);
    //PARAGRAPHS
    //Split Text var textLines = pdf.splitTextToSize(text, maxLineWidth);
    //Legacy paragraph wrapping
    //var PARA1WRAPPED = pdf.splitTextToSize("1.  " + LSGETPARA, maxLineWidth);
    //var PARA1TextHeight = (PARA1WRAPPED.length * fontSize * lineHeight) / ptsPerInch;
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
      initialYPosition: PARAONEHEIGHT, // Initial offset from top of document; set based on prior objects in document
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
  }
  render() {
    this.fillVariables();
    return (<div style={{display:'inline'}}>

      <button style={{margin:'5px'}} onClick={this.generateWrappedMemorandum2} type="submit">
        Generate PDF
      </button>
    </div>)
  }
}

export default GenerateMemorandum;
