import React, {Component} from 'react';
import Moment from 'moment';
import '.././App.css';


class SetTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
              attn: "TSGT AUSTIN R BEATY",
              from: "TSGT AUSTIN R BEATY",
              subject: "The Creation of Memorandums",
              para1: "The following information on writing a memorandum comes from the AFH 33-337 Tongue and Quill, pages 183-186.  This template matches the format for the header on page 183, and the body on page 185.  The letterhead is in Arial with the “DEPARTMENT OF THE AIR FORCE” bolded, and the unit name un-bolded.  Addresses in the “MEMORADUM FOR” and “FROM”  are only if the letter for an off station addressee and are not required—however, office symbols are!", unit: "31ST FIGHTER WING (USAFE)",
              date: "04/20/2020",
              dutytitle: "Superintendent, White House Master Control",
              writersname: "AUSTIN R BEATY",
              rank: "TSgt",
              branch: "USAF"
        };

    }


    testMemoSubmit = (event) => {
        console.log('onFormSubmit2');
        event.preventDefault();
        this.props.testMemoSubmit(this.state);
    }


    render() {
        const { attn, from, subject, para1, unit, date, dutytitle, rank, writersname, branch } = this.state;
        //Identifies type and DOM target for each <td></td> type located on Table.js
        return (
          <div>
            <form id="setTestForm" onSubmit={this.testMemoSubmit} />
            </div>

        );
    }
}

export default SetTest;
