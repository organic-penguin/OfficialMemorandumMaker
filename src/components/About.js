import React, { Component } from 'react';
import ParagraphInputs from "./AdditionalParagraphs";
class About extends Component {
  state = {
    paragraphArray: [{name:""}]
  }
handleParagraphChange = (e) => {
    if (["name"].includes(e.target.className) ) {
      let paragraphArray = [...this.state.paragraphArray]
      paragraphArray[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ paragraphArray })
    }
  }
addParagraph = (e) => {
    this.setState((prevState) => ({
      paragraphArray: [...prevState.paragraphArray, {name:"tt"}],
    }));
  }
handleSubmit = (e) => {
  console.log(this.state);
  e.preventDefault() }
render() {
    let {paragraphArray} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleParagraphChange} >
        <button onClick={this.addParagraph}>Add new Paragraph</button>
        <ParagraphInputs paragraphArray={paragraphArray} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default About;
