import React, {
  Component
} from 'react';
import Moment from 'moment';
import ParagraphInputs from "./AdditionalParagraphs";
import '.././App.css';
var currentDate = new Date();
currentDate.setDate(currentDate.getDate());
var formattedDateTwo = Moment(currentDate.toISOString()).format('YYYY-MM-DD');
class Form extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      attn: 'Insert Receiver of Memorandum Here',
      from: 'Insert Sender Information Here',
      subject: 'Insert Subject Here',
      para1: 'Insert Paragraph 1',
      para2: 'Insert Second Paragraph',
      unit: 'Type your Unit Here',
      dutytitle: "Enter Signer's Position Here",
      rank: "Select Signer's Rank",
      writersname: "Insert Signer's Name FIRST MI. LAST",
      branch: "USAF",
      paragraphArray: [
        {
          paraInfo: ""
        }
      ]
    };
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeUpper = this.handleChangeUpper.bind(this);
  }
  handleParagraphChange = (e) => {
    if (["paraInfo"].includes(e.target.className)) {
      let paragraphArray = [...this.state.paragraphArray]
      paragraphArray[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({
        paragraphArray
      })
    } else {
      const {
        name,
        value
      } = e.target;
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
  convertParagraphArray(conversionArray) {
    console.log("Converting Paragraph Array")
    var text = [];
    var x;
    for (x in conversionArray) {
      text.push(conversionArray[x]);
      console.log(text[x].paraInfo);
    }
  }
  handleChange(event) {
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleChangeUpper(event) {
    this.setState({
      writersNameUpper: event.target.value.toUpperCase()
    });
    this.setState({
      writersname: event.target.value.toUpperCase()
    });
  }
  onFormSubmit = (event) => {
    //console.log(this.state);
    //console.log(this.state.paragraphArray[0]);
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }
  clearForm = memorandum => {
    console.log("clearForm button pressed");
    this.setState({
      memorandum: [
        {
          attn: " ",
          from: " ",
          subject: " ",
          para1: " ",
          para2: " ",
          unit: " ",
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
    //Prep form state for default value of todays date
    this.setState({
      date: formattedDateTwo
    })
  }
  render() {
      const {
        attn,
        from,
        subject,
        para1,
        unit,
        dutytitle,
        rank,
        writersname,
      } = this.initialState;
      //Identifies type and DOM target for each <td></td> type located on Table.js
      let {
        paragraphArray
      } = this.state;

        return (
          <div style={{display: 'inline-block'}} class="w3-padding w3-round-xlarge w3-modal-content w3-card-4 w3-animate-zoom">
      <form class="formContainer w3-padding" id="memorandumForm" onSubmit={this.onFormSubmit} onChange={this.handleParagraphChange}>

        <label>Header</label>
        {
        //FIRST LINE
        }
        <div class="col50">
          <input type="text" name="unit" id="unit" placeholder={unit} onChange={this.handleChange} required />
        </div>
        <div class="col50">
          <input style={{height: '50px'}} type="date" name="date" id="date" defaultValue={formattedDateTwo} onChange={this.handleChange}/>
        </div>
        {
        //SECOND LINE
        }
        <div class="col50">
          <input type="text" name="attn" id="attn" placeholder={attn} onChange={this.handleChange} required/>
        </div>
        <div class="col50">
          <input type="text" name="from" id="from" placeholder={from} onChange={this.handleChange} required />
        </div>
        {
        //THIRD and FOURTH LINEs
        }
        <div class="col100">
          <input style={{width:'98%'}} type="text" name="subject" id="subject" placeholder={subject} onChange={this.handleChange} required />
        </div>
        <div class="col100">
          <label>Paragraph #1</label>
          <textarea style={{height: '10%', width:'98%'}} type="text" name="para1" id="para1" placeholder={para1} onChange={this.handleChange} required />
          </div>
        <ParagraphInputs paragraphArray={paragraphArray} />
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
                placeholder={writersname}
                value={this.state.writersNameUpper}
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
                onChange={this.handleChange} >
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
                placeholder={dutytitle}
                onChange={this.handleChange} required />
        </div>

        <div class="col50">
            <select
                type="text"
                name="rank"
                id="rank"
                placeholder={rank}
                defaultValue=""
                required
                onChange={this.handleChange} >
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
                    <option value="2Lt">Second Lieutineant</option>
                    <option value="1Lt">First Lieutineant</option>
                    <option value="Capt">Captain</option>
                    <option value="Maj">Major</option>
                    <option value="Lt. Col.">Lieutineant Colonel</option>
                    <option value="Colonel">Colonel</option>
                    <option value="Brigadier Genearl">Brigadier General</option>
                    <option value="Major General">Major General</option>
                    <option value="Lieutineant General">Lieutineant General</option>
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
