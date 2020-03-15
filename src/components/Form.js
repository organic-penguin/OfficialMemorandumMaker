import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            attn: 'Insert Receiver of Memorandum Here',
            from: 'Insert Your Information Here',
            subject: 'Insert Subject Here',
            para1: 'Insert first Paragraph',
        };

        this.state = this.initialState;
    }



    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        });

    }

    handleInputChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
}

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { attn, from, subject, para1 } = this.state;
        //Identifies type and DOM target for each <td> type located on Table.js
        return (
            <form onSubmit={this.onFormSubmit}>
                <label for="attn">ATTN</label>
                <input
                    type="text"
                    name="attn"
                    id="attn"
                    placeholder={attn}
                    onChange={this.handleChange} />
                <label for="from">From</label>
                <input
                    type="text"
                    name="from"
                    id="from"
                    placeholder={from}
                    onChange={this.handleChange} />
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder={subject}
                    onChange={this.handleChange} />
                <input
                    type="text"
                    name="para1"
                    id="para1"
                    placeholder={para1}
                    onChange={this.handleChange} />
                <button onClick="navigateForward" type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;
