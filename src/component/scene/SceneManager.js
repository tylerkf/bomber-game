import * as THREE from 'three';
import Person from './objects/person';

const MARINE_URL = '/models/marine/marine_anims_core.json';

export default canvas => {
	// set up three js
  const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
	const clock = new THREE.Clock();

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	// for testing
	const animated = [];
	scene.background = new THREE.Color(0x333333);
	scene.add(new THREE.AmbientLight(0xffffff));

	camera.position.set(0, 150, -500);
	camera.rotation.y = 180 * Math.PI / 180;

	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Person(model);
		animated.push(marine);
		scene.add(marine.mesh);
		marine.addAnimationTarget('run', 1, 0.1);
		marine.addAnimationTarget('idle', 0, 0.1);
	});

	function update() {
		const delta = clock.getDelta();

		for (let i = 0; i < animated.length; i++) {
			animated[i].update(delta);
		}
		renderer.render(scene, camera);
	}

	return {
		update
	}
};