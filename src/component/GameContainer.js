import React, { Component } from 'react';
import defaultKeyMap from '../config/defaultKeyMap';
import assetConfig from '../config/assets';
import Controls from './game/Controls';
import World from './game/World';
import Scene from './game/Scene';

class GameContainer extends Component {
	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
		this.resizeCanvas = this.resizeCanvas.bind(this);

		this.canvas;
		this.scene;
		this.world;
	}

	componentDidMount() {
		this.canvas = document.createElement('canvas');
		this.sceneContainer.appendChild(this.canvas);

		window.onresize = this.resizeCanvas;
  	this.resizeCanvas();

		//this.assets = new AssetLoader(assetConfig);
		this.scene = new Scene(this.canvas);
		this.world = new World(this.scene, this.controls, this.assets);
		this.controls = new Controls(this.world, defaultKeyMap);

		window.addEventListener('keydown', this.controls.onEvent);
		window.addEventListener('keyup', this.controls.onEvent);
		window.addEventListener('mousedown', this.controls.onEvent);
		window.addEventListener('mouseup', this.controls.onEvent);

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

		this.world.update();
		this.scene.render();
	}

	render() {
		return (
			<div ref={element => this.sceneContainer = element} />
		);
	}
}

export default GameContainer;
