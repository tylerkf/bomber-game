import * as THREE from 'three';
import Person from './objects/person';

const MARINE_URL = '/models/marine/marine_anims_core.json';

export default canvas => {
	// set up three js
  const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	// for testing
	scene.background = new THREE.Color(0x333333);
	scene.add(new THREE.AmbientLight(0xffffff));

	camera.position.set(0, 150, -500);
	camera.rotation.y = 180 * Math.PI / 180;

	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Person(model);
		scene.add(marine.mesh);
	});

	function update() {
		renderer.render(scene, camera);
	}

	return {
		update
	}
};