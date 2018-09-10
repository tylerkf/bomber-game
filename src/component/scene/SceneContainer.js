import React, { Component } from 'react';
import SceneManager from './SceneManager'

class ThreeContainer extends Component {
	componentDidMount() {
		this.initScene(this.sceneContainer);
	}

	initScene(container) {
		const canvas = document.createElement('canvas');
  	container.appendChild(canvas);

		const sceneManager = new SceneManager(canvas);

		window.onresize = resizeCanvas;
  	resizeCanvas();

  	requestAnimationFrame(this.render);

  	function resizeCanvas() {
		  canvas.style.width = '100%';
		  canvas.style.height= '100%';
		  canvas.width = canvas.offsetWidth;
		  canvas.height = canvas.offsetHeight;
		}

		function render(time) {
		  requestAnimationFrame(render);
		  sceneManager.update();
		}
	}

	render() {
		return (
			<div ref={element => this.sceneContainer = element} />
		);
	}
}

export default ThreeContainer;