import React, { Component } from 'react';
import Client from './game/Client';
import Console from './Console'
import TitleMessage from './TitleMessage';

class GameContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			titleMessage: ''
		};

		this.resizeCanvas = this.resizeCanvas.bind(this);
		this.addConsoleMessage = this.addConsoleMessage.bind(this);
		this.setTitleMessage = this.setTitleMessage.bind(this);
	}

	addConsoleMessage(text, from) {
		let message = {
			text: text,
			from: from
		};
    this.setState((prevState) => {
      return {
        messages: prevState.messages.concat(message)
      };
    });
  }

	setTitleMessage(message) {
		this.setState({
			titleMessage: message
		});
	}

	componentDidMount() {
		this.canvas = document.createElement('canvas');
		this.sceneContainer.appendChild(this.canvas);

		window.onresize = this.resizeCanvas;
  	this.resizeCanvas();

		this.client = new Client({
			url: this.props.serverUrl,
			username: this.props.username
		}, this.canvas, this.addConsoleMessage, this.setTitleMessage);
	}

	componentWillUnmount() {
		this.client.close();
  }

	resizeCanvas() {
		if (this.canvas !== undefined) {
		  this.canvas.style.width = '100%';
		  this.canvas.style.height= '100vh';
		  this.canvas.width = this.canvas.offsetWidth;
		  this.canvas.height = this.canvas.offsetHeight;
		}
	}

	render() {
		return (
			<React.Fragment>
				<Console messages={this.state.messages} />
				<TitleMessage message={this.state.titleMessage} />
				<div ref={element => this.sceneContainer = element} />
			</React.Fragment>
		);
	}
}

export default GameContainer;
