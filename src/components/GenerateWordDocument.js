import React, {Component} from 'react';
import { Document, Media, Packer, Paragraph, TextRun, Header, AlignmentType, HyperlinkRef} from "docx";
import { saveAs} from 'file-saver';

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
var LSGETLOGO;
var ATTN2;
var ATTN3;
var FROM2;
var FROM3;

var paragraphInfo = [];

function insertMultipleParagraphs() {
  LSGETNUMBEROFPARAGRAPHS = sessionStorage.getItem("extraParagraphs");
  var paras;
  var result = '2.  ' + sessionStorage.getItem(0);
  paragraphInfo[0] = new TextRun(result).break();
  for (paras = 1; paras <= LSGETNUMBEROFPARAGRAPHS; paras++) {
    var PARAGRAPH = (paras + 2) + '.  ' + (sessionStorage.getItem(paras));
    paragraphInfo[paras] = new TextRun(PARAGRAPH).break().break();
  }
}
class GenerateWordDocument extends Component {
  generateWrappedDocumentWithHeader = () => {
    // Create document
    const doc = new Document({
      creator: "USAF",
      title: "Official Memorandum",
      description: "Auto-Generated Memorandum",
      titlePage: true,
      styles: {
        paragraphStyles: [{
            id: "Body1",
            name: "Body1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
            }
          },
          {
            id: "Department",
            name: "Department",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial",
              bold: true
            }
          },
          {
            id: "Unit",
            name: "Unit",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial"
            }
          }

           ]
      }
    })
    insertMultipleParagraphs();
    const dodseal = Media.addImage(doc, Buffer.from(LSGETLOGO, "base64"), 105, 105, {
      floating: {
        horizontalPosition: {
          offset: 400000
        },
        verticalPosition: {
          offset: 405000
        }
      }
    });
    doc.addSection({
      size: {
        height: 15840,
        width: 12240
      },
      margin: {
        header: 0
      },
      headers: {
        first: new Header({
          children: [
             new Paragraph({
              spacing: {
                before: 280
              },
              text: LSGETDEPARTMENT,
              alignment: AlignmentType.CENTER,
              style: "Department"
            }),
             new Paragraph({
              text: LSGETUNIT,
              alignment: AlignmentType.CENTER,
              style: "Unit"
            }),
            new Paragraph({
             text: LSGETBASE,
             alignment: AlignmentType.CENTER,
             style: "Unit"
           }),
             new Paragraph({
              children: [
                 dodseal
               ]
            })
                    ]
        })
      },
      children: [
              new Paragraph({
          spacing: {
            before: 500
          },
          text: LSGETDATE,
          alignment: AlignmentType.RIGHT,
          style: "Body1"
        }),
             new Paragraph({
          text: "MEMORANDUM FOR  " + LSGETATTN,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "FROM  " + LSGETFROM,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "SUBJECT  " + LSGETSUBJECT,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "1.  " + LSGETPARA,
          style: "Body1"
        }),
            new Paragraph({
          children: [
                paragraphInfo[0],
                paragraphInfo[1],
                paragraphInfo[2],
                paragraphInfo[3],
                paragraphInfo[4],
                paragraphInfo[5],
                paragraphInfo[6],
                paragraphInfo[7],
                paragraphInfo[8],
                paragraphInfo[9]
              ],
          style: "Body1"
        }),
           new Paragraph({
          indent: {
            left: 5040
          },
          children: [
               new TextRun(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH).break().break().break().break(),
               new TextRun(LSGETDUTYTITLE).break()
             ],
          style: "Body1"
        }),

         ],
    });
    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      saveAs(blob, LSGETSUBJECT + ".docx");
    });
  }
  generateWrappedDocumentNoHeader = () => {
    console.log("NO HEADER");
    // Create document
    const doc = new Document({
      creator: "USAF",
      title: "Sample Document",
      description: "A brief example of using docx",
      styles: {
        paragraphStyles: [{
            id: "Body1",
            name: "Body1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
            }
          },
          {
            id: "Department",
            name: "Department",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial",
              bold: true
            }
          },
          {
            id: "Unit",
            name: "Unit",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial"
            }
          }

           ]
      }
    })
    insertMultipleParagraphs();
    const dodseal = Media.addImage(doc, Buffer.from(LSGETLOGO, "base64"), 105, 105, {
      floating: {
        horizontalPosition: {
          offset: 400000
        },
        verticalPosition: {
          offset: 405000
        }
      }
    });
    doc.addSection({
      size: {
        height: 15840,
        width: 12240
      },
      children: [
           new Paragraph({
          text: LSGETDEPARTMENT,
          alignment: AlignmentType.CENTER,
          style: "Department"
        }),
           new Paragraph({
          text: LSGETUNIT,
          alignment: AlignmentType.CENTER,
          style: "Unit"
        }),
           new Paragraph({
          children: [
               dodseal
             ]
        }),
            new Paragraph({
            spacing: {
            before: 720
          },
          text: LSGETDATE,
          alignment: AlignmentType.RIGHT,
          style: "Body1"
        }),
             new Paragraph({
          text: "MEMORANDUM FOR  " + LSGETATTN,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "FROM  " + LSGETFROM,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "SUBJECT  " + LSGETSUBJECT,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "1.  " + LSGETPARA,
          style: "Body1"
        }),
            new Paragraph({
          children: [
                paragraphInfo[0],
                paragraphInfo[1],
                paragraphInfo[2],
                paragraphInfo[3],
                paragraphInfo[4],
                paragraphInfo[5],
                paragraphInfo[6],
                paragraphInfo[7],
                paragraphInfo[8],
                paragraphInfo[9]
              ],
          style: "Body1"
        }),
           new Paragraph({
          indent: {
            left: 5040
          },
          children: [
               new TextRun(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH).break().break().break().break(),
               new TextRun(LSGETDUTYTITLE).break()
             ],
          style: "Body1"
        }),

         ],
    });
    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      saveAs(blob, LSGETSUBJECT + ".docx");
    });
  }
  grnerateWrappedDocumentAdvancedHeader = () => {
    // Create document

    if(sessionStorage.getItem("adv").split(',')[0] === ""){
     ATTN2 = new HyperlinkRef()
    }else{
     ATTN2 = new Paragraph({
                   text: "\t\t\t     " + sessionStorage.getItem("adv").split(',')[0],
                   style: "Body1"
                 })
               }
    if(sessionStorage.getItem("adv").split(',')[1] === ""){
    ATTN3 = new HyperlinkRef()
    }else{
    ATTN3 = new Paragraph({
                  text: "\t\t\t     " + sessionStorage.getItem("adv").split(',')[1],
                  style: "Body1"
                })
              }
    if(sessionStorage.getItem("adv").split(',')[2] === ""){
     FROM2 = new HyperlinkRef()
    }else{
     FROM2 = new Paragraph({
                   text: "\t  " + sessionStorage.getItem("adv").split(',')[2],
                   style: "Body1"
                 })
               }
    if(sessionStorage.getItem("adv").split(',')[3] === ""){
    FROM3 = new HyperlinkRef()
    }else{
    FROM3 = new Paragraph({
                  text: "\t  " + sessionStorage.getItem("adv").split(',')[3],
                  style: "Body1"
                })
              }
    const doc = new Document({
      creator: "USAF",
      title: "Official Memorandum",
      description: "Auto-Generated Memorandum",
      titlePage: true,
      styles: {
        paragraphStyles: [{
            id: "Body1",
            name: "Body1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
            }
          },
          {
            id: "Department",
            name: "Department",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial",
              bold: true
            }
          },
          {
            id: "Unit",
            name: "Unit",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial"
            }
          }

           ]
      }
    })
    insertMultipleParagraphs();
    const dodseal = Media.addImage(doc, Buffer.from(LSGETLOGO, "base64"), 105, 105, {
      floating: {
        horizontalPosition: {
          offset: 400000
        },
        verticalPosition: {
          offset: 405000
        }
      }
    });
    doc.addSection({
      size: {
        height: 15840,
        width: 12240
      },
      margin: {
        header: 0
      },
      headers: {
        first: new Header({
          children: [
             new Paragraph({
              spacing: {
                before: 280
              },
              text: LSGETDEPARTMENT,
              alignment: AlignmentType.CENTER,
              style: "Department"
            }),
             new Paragraph({
              text: LSGETUNIT,
              alignment: AlignmentType.CENTER,
              style: "Unit"
            }),
            new Paragraph({
             text: LSGETBASE,
             alignment: AlignmentType.CENTER,
             style: "Unit"
           }),
             new Paragraph({
              children: [
                 dodseal
               ]
            })
                    ]
        })
      },
      children: [
              new Paragraph({
          spacing: {
            before: 500
          },
          text: LSGETDATE,
          alignment: AlignmentType.RIGHT,
          style: "Body1"
        }),
             new Paragraph({
          text: "MEMORANDUM FOR  " + LSGETATTN,
          style: "Body1"
        }),
        ATTN2,
        ATTN3,
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "FROM  " + LSGETFROM,
          style: "Body1"
        }),
        FROM2,
        FROM3,
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "SUBJECT  " + LSGETSUBJECT,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "1.  " + LSGETPARA,
          style: "Body1"
        }),
            new Paragraph({
          children: [
                paragraphInfo[0],
                paragraphInfo[1],
                paragraphInfo[2],
                paragraphInfo[3],
                paragraphInfo[4],
                paragraphInfo[5],
                paragraphInfo[6],
                paragraphInfo[7],
                paragraphInfo[8],
                paragraphInfo[9]
              ],
          style: "Body1"
        }),
           new Paragraph({
          indent: {
            left: 5040
          },
          children: [
               new TextRun(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH).break().break().break().break(),
               new TextRun(LSGETDUTYTITLE).break()
             ],
          style: "Body1"
        }),

         ],
    });
    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      saveAs(blob, LSGETSUBJECT + ".docx");
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

    //Receive LOGO Base64 and cut off the descriptors. DOCX.JS auto-fills requirements and does not accept redundant descriptors
    LSGETLOGO = sessionStorage.getItem("MemoHeaderLogoBase");
    if(LSGETLOGO == null){}else{
      LSGETLOGO = LSGETLOGO.slice(22);
    }


  }
  render() {
    this.fillVariables();
    return (<div style={{display: 'inline'}}>

      <button style={{margin:'5px', display:"none"}} onClick={this.generateWrappedDocumentWithHeader} type="submit">
        Generate Word Document (Must Edit Header and Select 'Different First Page')
      </button>
      <button style={{margin:'5px'}} onClick={this.grnerateWrappedDocumentAdvancedHeader} type="submit">
        Generate Word Document (Must Edit Header and Select 'Different First Page')
      </button>
      <button style={{margin:'5px', display: "none"}} onClick={this.generateWrappedDocumentNoHeader} type="submit">
        Generate Word Document Without Header
      </button>

    </div>)
  }
}

export default GenerateWordDocument;
