import React, { Component} from 'react';
import '.././App.css';
class SetTest extends Component {
  constructor(props) {
    super(props);
    //Values that will be set in Set Test
    this.state = {
      department: "DEPARTMENT OF THE AIR FORCE",
      attn: "31 MXG/MXQ",
      from: "31 MXG/MXQ",
      subject: "The Creation of Memorandums",
      para1: "The following information on writing a memorandum comes from the AFH 33-337 Tongue and Quill, pages 183-186.  This template matches the format for the header on page 183, and the body on page 185.  The letterhead is in Arial with the “DEPARTMENT OF THE AIR FORCE” bolded, and the unit name un-bolded.  Addresses in the “MEMORADUM FOR” and “FROM”  are only if the letter for an off station addressee and are not required—however, office symbols are!",
      unit: "31ST FIGHTER WING (USAFE)",
      base: "Joint Base Anacostia-Bolling",
      date: "20 April 2020",
      dutytitle: "Superintendent, Operations",
      writersname: "ORGANIC PENGUIN",
      rank: "TSgt",
      branch: "USAF",
      paragraphArray: [{
        paraInfo: "When writing the body start with number 1 directly under the S in subject.  If there is only one paragraph do not enter the number of paragraph.  Also, if it is more than one line it must line up under the number one, like it is here."
      }, {
        paraInfo: "The signature block must be 5 line below the last paragraph, which should leave four empty line between the last paragraph and the first line of the signature block.  The block should also start at 2 spaces past the middle point of the letter (basically 3 3/8” on a word document with 1 inch borders.  If the letter is electronically signed it must be in this format “//signed/jsd/14May2008//” and must be part of a electronically signed email.  You must keep the email of the signed letter.  This is a bit confusing, but the process makes it a lot easier for us.  I will help you with this if you do not understand."
      }, {
        paraInfo: "Repeat Paragraph 1, three times to Force Page Wrap:  The following information on writing a memorandum comes from the AFH 33-337 Tongue and Quill, pages 183-186.  This template matches the format for the header on page 183, and the body on page 185.  The letterhead is in Arial with the “DEPARTMENT OF THE AIR FORCE” bolded, and the unit name un-bolded.  Addresses in the “MEMORADUM FOR” and “FROM”  are only if the letter for an off station addressee and are not required—however, office symbols are! The following information on writing a memorandum comes from the AFH 33-337 Tongue and Quill, pages 183-186.  This template matches the format for the header on page 183, and the body on page 185.  The letterhead is in Arial with the “DEPARTMENT OF THE AIR FORCE” bolded, and the unit name un-bolded.  Addresses in the “MEMORADUM FOR” and “FROM”  are only if the letter for an off station addressee and are not required—however, office symbols are! The following information on writing a memorandum comes from the AFH 33-337 Tongue and Quill, pages 183-186.  This template matches the format for the header on page 183, and the body on page 185.  The letterhead is in Arial with the “DEPARTMENT OF THE AIR FORCE” bolded, and the unit name un-bolded.  Addresses in the “MEMORADUM FOR” and “FROM”  are only if the letter for an off station addressee and are not required—however, office symbols are!"
      }, {
        paraInfo: "If you end the letter with “any questions please contact” do not create a new paragraph just for that information.  Put it at the end of the last paragraph on the topic.  Like this paragraph.  If you have any questions please contact MSgt Joe Doe at 632-8620."
      }]
    };
  }

  testMemoSubmit = (event) => {
    event.preventDefault();
    this.props.testMemoSubmit(this.state);
    sessionStorage.setItem("extraATTN", 2);
    sessionStorage.setItem("extraFROM", 2);
    sessionStorage.setItem("adv", "Unit 6118 Box 118 (not required),APO AE 09604  (not required),Unit 6118 Box 118 (not required),APO AE 09604  (not required)")
  }

    render() {
        //Identifies type and DOM target for each <td></td> type located on Table.js
        return (
          <div>
            <form id="setTestForm" onSubmit={this.testMemoSubmit} />
            </div>
        );
    }
}

export default SetTest;
