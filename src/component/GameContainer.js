import React, { Component } from 'react';
import Client from './game/Client';
import Console from './Console'

class GameContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: []
		};

		this.update = this.update.bind(this);
		this.resizeCanvas = this.resizeCanvas.bind(this);
		this.addConsoleMessage = this.addConsoleMessage.bind(this);
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

	componentDidMount() {
		this.canvas = document.createElement('canvas');
		this.sceneContainer.appendChild(this.canvas);

		window.onresize = this.resizeCanvas;
  	this.resizeCanvas();

		this.client = new Client({
			url: this.props.serverUrl,
			username: this.props.username
		}, this.canvas, this.addConsoleMessage);

  	requestAnimationFrame(this.update);
	}

	resizeCanvas() {
		if (this.canvas !== undefined) {
		  this.canvas.style.width = '100%';
		  this.canvas.style.height= '100vh';
		  this.canvas.width = this.canvas.offsetWidth;
		  this.canvas.height = this.canvas.offsetHeight;
		}
	}

	update(time) {
		requestAnimationFrame(this.update);

		this.client.world.update();
		this.client.scene.render();
	}

	render() {
		return (
			<React.Fragment>
				<Console messages={this.state.messages} />
				<div ref={element => this.sceneContainer = element} />
			</React.Fragment>
		);
	}
}

export default GameContainer;
