import * as THREE from 'three';

export default canvas => {
  const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);

	const clock = new THREE.Clock();

	scene.background = new THREE.Color(0x333333);
	scene.add(new THREE.AmbientLight(0xffffff));

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	camera.position.set(0, 150, -500);
	console.log(camera.rotation);
	camera.rotation.y = 180 * Math.PI / 180;
};