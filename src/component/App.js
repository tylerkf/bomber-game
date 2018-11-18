import React, { Component } from 'react';

import GameContainer from './GameContainer'
import Overlay from './Overlay'
import Console from './Console'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      name: 'Player1',
      key: 0,
      messages: []
    }

    this.joinServer = this.joinServer.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message) {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.concat(message)
      };
    });
  }

  joinServer(name, url) {
    this.setState((prevState) => {
      return {
        url: url,
        name: name,
        key: prevState.key + 1
      }
    })
  }

  componentDidMount() {
    this.addMessage({
      from: 'Harvey',
      text: 'Hello world',
    })

    setInterval(() => {
      this.addMessage({
        from: 'Harvey',
        text: 'Hello world'
      })
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <Overlay onJoin={this.joinServer} currentUrl={this.state.url} currentName={this.state.name}/>
        <Console messages={this.state.messages} />
        <GameContainer key={this.state.key} serverUrl={this.state.url} username={this.state.name} />
      </React.Fragment>
    );
  }
}

export default App;
