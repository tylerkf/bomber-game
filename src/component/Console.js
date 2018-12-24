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
    let message;
    if(this.props.from === 'error') {
      message = <span className='error-message'>{this.props.text}</span>;
    } else {
      message = <span><b>{this.props.from}</b> {this.props.text}</span>;
    }
    return (
      <li className='console-message'>
        {message}
      </li>
    );
  }
}

export default Console;
