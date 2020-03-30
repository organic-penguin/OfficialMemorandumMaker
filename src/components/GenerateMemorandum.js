import React, {Component} from 'react';
import jsPDF from 'jspdf'
import DoDSeal from '../images/DoD Seal.PNG'

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

//Generate pdf object as 'doc'
var doc = new jsPDF({orientation: 'p', unit: "in", format: 'letter'});

function addWrappedText({
  text,
  textWidth,
  doc,
  fontSize = 12,
  fontType = 'normal',
  lineSpacing = oneLineHeight,
  xPosition = margin,
  initialYPosition = PARAONEHEIGHT,
  pageWrapInitialYPosition = 1
}) {
  doc.setFontType(fontType);
  doc.setFontSize(fontSize);
  var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
  var pageHeight = doc.internal.pageSize.height - 1; // Get page height, we'll use this for auto-paging. TRANSLATE this line if using units other than `pt`
  cursorY = initialYPosition;

  textLines.forEach(lineText => {
    if (cursorY > pageHeight) { // Auto-paging
      doc.addPage();
      cursorY = pageWrapInitialYPosition;
    }
    doc.text(xPosition, cursorY, lineText);
    cursorY += lineSpacing;

  })
}


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

function insertMultipleParagraphs() {
  LSGETNUMBEROFPARAGRAPHS = sessionStorage.getItem("extraParagraphs");
  var paras;
  for (paras = 0; paras <= LSGETNUMBEROFPARAGRAPHS; paras++) {
    var PARAGRAPH = (paras + 2) + '.  ' + (
    sessionStorage.getItem(paras));
    addWrappedText({
      text: PARAGRAPH, // Put a really long string here
      textWidth: 6.5,
      doc,

      // Optional
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: oneLineHeight, // Space between lines
      xPosition: margin, // Text offset from left of document
      initialYPosition: cursorY + oneLineHeight, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 1 // Initial offset from top of document when page-wrapping
    });
  }
}

class GenerateMemorandum extends Component {

  state = {
    dateHeight: 1.9166,
    attnHEIGHT: this.dateHeight
  }

  generateWrappedMemorandum2 = () => {

    //set Document font information
    //HEADER
    //Insert header DOD logo
    toDataURL(DoDSeal, function(dataUrl) {
      console.log('RESULT:', dataUrl);
      sessionStorage.setItem('MemoHeaderLogoBase', dataUrl);
    })
    doc.addImage(sessionStorage.getItem('MemoHeaderLogoBase').toString(), 'PNG', .4,.4,1,1)


    doc.setFont("Helvetica")
    doc.setFontStyle("bold");
    doc.setFontSize(12);
    doc.text("DEPARTMENT OF THE AIR FORCE", 4.25, .845, null, null, "center");
    doc.setFontStyle("normal");
    doc.text(LSGETUNIT, 4.25, 1.039, "center");

    //BODY
    doc.setFont('Times New Roman');
    doc.text(LSGETDATE, 7.5, DATEHEIGHT, null, null, "right");
    doc.text("MEMORANDUM FOR  " + LSGETATTN, 1, ATTNHEIGHT);
    doc.text("FROM:  " + LSGETFROM, 1, FROMHEIGHT);
    doc.text("SUBJECT:  " + LSGETSUBJECT, 1, SUBJECTHEIGHT);

    //PARAGRAPHS
    //Split Text var textLines = doc.splitTextToSize(text, maxLineWidth);

    //Legacy paragraph wrapping
    //var PARA1WRAPPED = doc.splitTextToSize("1.  " + LSGETPARA, maxLineWidth);
    //var PARA1TextHeight = (PARA1WRAPPED.length * fontSize * lineHeight) / ptsPerInch;

    var PARAGRAPH1 = '1.  ' + LSGETPARA;

    addWrappedText({
      text: PARAGRAPH1, // Put a really long string here
      textWidth: 6.5,
      doc,

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
    doc.text(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH, 4.5, cursorY + (oneLineHeight * 5));
    doc.text(LSGETDUTYTITLE, 4.5, cursorY + (oneLineHeight * 6));

    //doc.output('dataurlnewwindow');
    var string = doc.output('datauristring');
    var embed = "<embed width='100%' type='application/pdf' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();

    //Reinitialize the doc to clear previous states
    doc = new jsPDF({orientation: 'p', unit: "in", format: 'letter'});

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
    return (<div>

      <button onClick={this.generateWrappedMemorandum2} type="submit">
        Generate PDF
      </button>
    </div>)
  }
}

export default GenerateMemorandum;
