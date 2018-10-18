import React, { Component } from 'react';

import GameContainer from './GameContainer'
import Overlay from './Overlay'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      name: 'Player1',
      key: 0
    }

    this.joinServer = this.joinServer.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <Overlay onJoin={this.joinServer} currentUrl={this.state.url} currentName={this.state.name}/>
        <GameContainer key={this.state.key} serverUrl={this.state.url} username={this.state.name} />
      </React.Fragment>
    );
  }
}

export default App;
