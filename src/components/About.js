import React, { Component } from 'react';

class About extends Component {
  render() {
    const myElement = <About brand="Ford" />;

    return (
        <div>
          <h2>About</h2>
          I am a {myElement.props.brand}!
        </div>
    );
  }
}

export default About;
