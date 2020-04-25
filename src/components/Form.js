import React, { Component} from 'react';
import Moment from 'moment';
import ParagraphInputs from "./AdditionalParagraphs";
import AdditionalHeaderInfo from "./AdditionalHeaderInfo"
import '.././App.css';

var extraParagraphs;
var formattedDateTwo;
var currentDate = new Date();
currentDate.setDate(currentDate.getDate());


class Form extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      department: 'DEPARTMENT OF THE AIR FORCE',
      departmentNameUpper: "DEPARTMENT OF THE AIR FORCE",
      unit: 'Type your Unit Here',
      base: 'Optional Second Unit Header Line',
      attn: 'Insert Receiver of Memorandum Here',
      from: 'Insert Sender Information Here',
      subject: 'Insert Subject Here',
      para1: 'Insert Paragraph 1',
      para2: 'Insert Second Paragraph',
      dutytitle: "Enter Signer's Position Here",
      rank: "Select Signer's Rank",
      writersname: "Insert Signer's Name FIRST MI. LAST",
      branch: "USAF",
      paragraphArray: [
        {
          paraInfo: ""
        }
      ],
      showModal: false
    };
    this.state = {
      branch: "USAF",
      paragraphArray: [
        {
          paraInfo: ""
        }
      ],
      showModal: false
    };

    this.handleChangeUpper = this.handleChangeUpper.bind(this);
  }

  handleParagraphChange = (e) => {
    if (["paraInfo"].includes(e.target.className)) {
      var paragraphArray = [...this.state.paragraphArray]
      paragraphArray[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({
        paragraphArray
      })
    } else {
      const {name, value} = e.target;
      this.setState({
        [name]: value
      });
    }
  }

  addParagraph = (e) => {
    this.setState((prevState) => ({
      paragraphArray: [
        ...prevState.paragraphArray, {
          paraInfo: ""
        }
      ]
    }));
  }

  showModal = e => {
      this.setState({
        showModal: !this.state.showModal
      });
    };

  refreshForm = () =>{
    this.setState({attn: sessionStorage.getItem("attn")});
    this.setState({from: sessionStorage.getItem("from")});
  }

  handleChangeUpper(event) {
    const {name} = event.target;
    var targetName;
    if(name === "writersname"){
      targetName = "writersNameUpper"
    }else if(name === "department"){
      targetName = "departmentNameUpper"
    }
    this.setState({
      [targetName]: event.target.value.toUpperCase()
    });

  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }

  clearForm = memorandum => {
    console.log("clearForm button pressed");
    //Uses this pre'generated memorandum to submit and refresh
    this.setState({
      memorandum: [
        {
          department: " ",
          attn: " ",
          from: " ",
          subject: " ",
          para1: " ",
          para2: " ",
          unit: " ",
          base: " ",
          date: " ",
          dutytitle: " ",
          rank: " ",
          writersname: " ",
          branch: " "
        }
      ]
    });
    sessionStorage.clear();
    alert("The information in your memorandum has been cleared.");
    window.location.reload();
  }

  componentDidMount() {
    setTimeout(() => {
    //Get variables from sessionStorage to enabled editing of the form post submission
    this.setState({departmentNameUpper: sessionStorage.getItem("department")});
    this.setState({department: sessionStorage.getItem("department")});
    this.setState({unit: sessionStorage.getItem("unit")});
    this.setState({base: sessionStorage.getItem("base")});
    this.setState({attn: sessionStorage.getItem("attn")});
    this.setState({from: sessionStorage.getItem("from")});
    this.setState({subject: sessionStorage.getItem("subject")});
    this.setState({para1: sessionStorage.getItem("para1")});
    this.setState({writersNameUpper: sessionStorage.getItem("writersname")});
    this.setState({writersname: sessionStorage.getItem("writersname")});
    this.setState({rank: sessionStorage.getItem("rank")});
    this.setState({dutytitle: sessionStorage.getItem("dutytitle")});
    extraParagraphs = sessionStorage.getItem("extraParagraphs")

    if(sessionStorage.getItem("branch") === null){}else{
      this.setState({branch: sessionStorage.getItem("branch")});
    }

    //Checks if extra paragraphs is null
    if(extraParagraphs == null){
    }else{
    this.setState({paragraphArray: JSON.parse(sessionStorage.getItem('paragraphArray'))})
  }

  //Process date Default (Current Date) vs edit date based on submission
  if(sessionStorage.getItem("date") !== null){
  formattedDateTwo = Moment(sessionStorage.getItem("date"), ['DDMMMMY', 'YYYYMMDD']).format('YYYY-MM-DD');
  } else{
  formattedDateTwo = Moment(currentDate.toISOString()).format('YYYY-MM-DD');
  }

    //Prep form state for default value of todays date
    this.setState({ date: formattedDateTwo })
  }, 200)
  }

  render() {
    const { department, attn, from, subject, para1, unit, base, dutytitle, rank, writersname, } = this.initialState;
      //Identifies type and DOM target for each <td></td> type located on Table.js
      let { paragraphArray } = this.state;
      return (

      <div style={{display: 'inline-block'}} class="w3-padding w3-round-xlarge w3-modal-content w3-card-4 w3-animate-zoom">

      <AdditionalHeaderInfo onClose={this.showModal} refreshForm={this.refreshForm} show={this.state.showModal} />

      <form class="formContainer w3-padding" id="memorandumForm" onSubmit={this.onFormSubmit} onChange={this.handleParagraphChange}>


        <label>Header</label>
        {

        //HEADER INFO

        }
        <table style={{marginBottom: '15'}}>
        <tr>
        <th>
          <input
            type="text"
            name="department"
            id="department"
            value = {this.state.departmentNameUpper}
            onChange = {this.handleChangeUpper}
            placeholder={department}
            />
        </th>
        <th></th>
        <th>
          <input
            type="text"
            name="unit"
            id="unit"
            value={this.state.unit}
            placeholder={unit}
            required />
        </th>
        </tr>

        <tr>
        <th>
          <input
            type="text"
            name="base"
            id="base"
            value={this.state.base}
            placeholder={base}
            />
        </th>
        <th></th>
        <th>

          <input
            style={{height: '50px'}}
            type="date"
            name="date"
            id="date"
            value={this.state.date}
            defaultValue={formattedDateTwo}
            />
        </th>
        </tr>
        {
        //SECOND LINE
        }
        <tr>
        <th>
          <input type="text"
          name="attn"
          id="attn"
          value={this.state.attn}
          placeholder={attn}
          required/>
        </th>

        <th style={{textAlign: 'center'}}>


        <div class="tooltip"><icon onClick={this.showModal} style={{fontSize: '1.25rem'}} className="fa fa-plus-circle" />
          <span class="tooltiptext">Advanced Heading</span>
        </div>


        </th>
        <th>

          <input
          type="text"
          name="from"
          id="from"
          value={this.state.from}
          placeholder={from}
          required />

        </th>
        </tr>
        </table>
        {
        //THIRD and FOURTH LINEs
        }
        <div class="col100">
          <input
          type="text"
          name="subject"
          id="subject"
          value={this.state.subject}
          placeholder={subject}
          required />
        </div>
        <div class="col100">
          <label>Paragraph #1</label>
          <textarea
          style={{height: '10%'}}
          type="text"
          name="para1"
          id="para1"
          value={this.state.para1}
          placeholder={para1}
          required />
          </div>

          <ParagraphInputs extraParagraphs={extraParagraphs} paragraphArray={paragraphArray} />

        <button onClick={this.addParagraph} type="button">Add New Paragraph</button>
            {

                //SIGNATURE BLOCK
            }

    <label style={{display:'inline-block', width: '100%'}}>Signature Block</label>

        <div class="col50" >
            <input
                type="text"
                name="writersname"
                id="writersname"
                value={this.state.writersNameUpper}
                placeholder={writersname}
                onChange={this.handleChangeUpper}
                required/>
        </div>



        <div class="col50">
            <select
                type="text"
                name="branch"
                id="branch"
                defaultValue="USAF"
                required
                onChange={this.handleChange}>
                    <option value="" disabled >Choose Your Branch</option>
                    <option value="USAF">United States Air Force</option>
                    <option value="USA">United States Army</option>
                    <option value="USN">United States Navy</option>
                    <option value="USMC">United States Marine Corps</option>
            </select>
        </div>

        <div class="col50">
            <input
                type="text"
                name="dutytitle"
                id="dutytitle"
                value={this.state.dutytitle}
                placeholder={dutytitle}
                required />
        </div>

        <div class="col50">
            <select
                type="text"
                name="rank"
                id="rank"
                placeholder={rank}
                value = {this.state.rank}
                defaultValue=''
                required
               >
                    <option value="" disabled>Choose Your Rank</option>
                    <option value="AB">Airman Basic</option>
                    <option value="Amn">Airman</option>
                    <option value="A1C">Airman First Class</option>
                    <option value="SrA">Senior Airman</option>
                    <option value="SSgt">Staff Sergeant</option>
                    <option value="TSgt">Technical Sergeant</option>
                    <option value="MSgt">Master Sergeant</option>
                    <option value="SMSgt">Senior Master Sergeant</option>
                    <option value="CMSgt">Chief Master Sergeant</option>
                    <option value="2d Lt">Second Lieutenant</option>
                    <option value="1st Lt">First Lieutenant</option>
                    <option value="Capt">Captain</option>
                    <option value="Maj">Major</option>
                    <option value="Lt. Col.">Lieutenant Colonel</option>
                    <option value="Colonel">Colonel</option>
                    <option value="Brigadier Genearl">Brigadier General</option>
                    <option value="Major General">Major General</option>
                    <option value="Lieutenant General">Lieutenant General</option>
                    <option value="General">General</option>
            </select>
        </div>


        </form>
        <div class="col50">
        <button style={{width: '100%'}} form="memorandumForm" type="submit">
            Submit
        </button>
        </div>

        <div class="col50">
        <button style={{width: "100%"}} onClick={this.clearForm} >
            Clear Form
        </button>

        </div>
</div>

        );
    }
}

export default Form;
