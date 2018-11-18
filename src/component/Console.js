import React, { Component } from 'react';

class Console extends Component {
  render() {
    let key = 1;
    let messages = this.props.messages.slice(-5).map(m =>
      <ConsoleMessage key={key++} text={m.text} from={m.from}/>
    );

    return (
      <ul className='console'>
        {messages}
      </ul>
    );
  }
}

class ConsoleMessage extends Component {
  render() {
    return (
      <li className='console-message'>
        <b>{this.props.from}</b> {this.props.text}
      </li>
    );
  }
}

export default Console;
