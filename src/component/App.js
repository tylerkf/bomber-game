import React, { Component } from 'react';

import GameContainer from './GameContainer'
import Overlay from './Overlay'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      name: 'Player1'
    }

    this.joinServer = this.joinServer.bind(this);
  }

  joinServer(name, url) {
    alert('Attempting to join as ' + name + ' to ' + url);
    this.setState({
      url: url,
      name: name
    })
  }

  render() {
    return (
      <React.Fragment>
        <Overlay onJoin={this.joinServer} currentUrl={this.state.url} currentName={this.state.name}/>
        <GameContainer serverUrl={this.state.url} username={this.state.name} />
      </React.Fragment>
    );
  }
}

export default App;
