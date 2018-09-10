import React, { Component } from 'react';
import SceneManager from './SceneManager'

class SceneContainer extends Component {
	componentDidMount() {
		const container = this.sceneContainer
		const canvas = document.createElement('canvas');
  	container.appendChild(canvas);

		const sceneManager = new SceneManager(canvas);

		window.onresize = resizeCanvas;
  	resizeCanvas();

  	requestAnimationFrame(update);

  	function resizeCanvas() {
		  canvas.style.width = '100%';
		  canvas.style.height= '100%';
		  canvas.width = canvas.offsetWidth;
		  canvas.height = canvas.offsetHeight;
		}

		function update(time) {
		  requestAnimationFrame(update);
		  sceneManager.update();
		}
	}

	render() {
		return (
			<div ref={element => this.sceneContainer = element} />
		);
	}
}

export default SceneContainer;