import React, { Component} from 'react';
import attnFromExample from '../images/attnFromExample.JPG';

class AdditionalHeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attn: ' ',
      attn2: '',
      attn3: '',
      from: ' ',
      from2: '',
      from3: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onClose = e => {
    sessionStorage.setItem('attn', this.state.attn)
    sessionStorage.setItem('from', this.state.from)
    sessionStorage.setItem('adv', [this.state.attn2, this.state.attn3, this.state.from2, this.state.from3])
    if(this.state.attn2 !== '' && this.state.attn3 !== ''){
      sessionStorage.setItem("extraATTN", 2);
    }else if(this.state.attn2 === '' && this.state.attn3 === ''){
      sessionStorage.setItem("extraATTN", 0)
    }else{
      sessionStorage.setItem("extraATTN", 1)
    }
    if(this.state.from2 !== '' && this.state.from3 !== ''){
      sessionStorage.setItem("extraFROM", 2);
    }else if(this.state.from2 === '' && this.state.from3 === ''){
      sessionStorage.setItem("extraFROM", 0)
    }else{
      sessionStorage.setItem("extraFROM", 1)
    }
    this.props.onClose && this.props.onClose(e);
    this.props.refreshForm && this.props.refreshForm(e);
  };

  handleChange =(event)=> {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }


  componentDidMount() {
    setTimeout(() => {
    //Get variables from sessionStorage to enabled editing of the form post submission
    //If else due to null values
    if(sessionStorage.getItem('adv') == null){
    }else{
    var advArray = sessionStorage.getItem("adv").split(',');
    this.setState({attn2: advArray[0]})
    this.setState({attn3: advArray[1]})
    this.setState({from2: advArray[2]})
    this.setState({from3: advArray[3]})
    }
    this.setState({attn: sessionStorage.getItem("attn")});
    this.setState({from: sessionStorage.getItem("from")});
  }, 200)
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div style={{display: 'block', height: '100%', width: '100%'}} class="modal" id="modal">
      <div class="w3-round-xlarge modal-main">
      <div class="helptip">
        <h2>Advanced Heading <icon aria-hidden="true" className="fa fa-info-circle" /></h2>
        <span class="helptiptext">
        <img style= {{borderRadius:'10px'}}src={attnFromExample} alt="Example of Advanced Header" height="140" width="400" />
        </span></div>
        <div class="content">
        <table>
        <tr>
        <th>
        <input
          type="text"
          name="attn"
          id="attn"
          placeholder=''
          value={this.state.attn}
          onChange={this.handleChange} />
          </th>
          <th>
          <input
            type="text"
            name="from"
            id="from"
            placeholder=''
            value={this.state.from}
            onChange={this.handleChange} />
          </th>
          </tr>
          <tr>
          <th>
        <input
          type="text"
          name="attn2"
          id="attn2"
          placeholder=''
          value={this.state.attn2}
          onChange={this.handleChange} />
          </th>
          <th>
          <input
            type="text"
            name="from2"
            id="from2"
            placeholder=''
            value={this.state.from2}
            onChange={this.handleChange} />
          </th>
          </tr>
          <tr>
          <th>
          <input
            type="text"
            name="attn3"
            id="attn3"
            placeholder=''
            value={this.state.attn3}
            onChange={this.handleChange} />
          </th>
          <th>
          <input
            type="text"
            name="from3"
            id="from3"
            placeholder=''
            value={this.state.from3}
            onChange={this.handleChange} />
          </th>
          </tr>
          </table>
        </div>
        <div class="actions">
        <button style={{margins: '5px'}} onClick={this.onClose}> Save </button>
        </div>
        </div>
      </div>
      )
}
}

export default AdditionalHeaderInfo;
