import * as THREE from 'three';
import Player from './entities/Player';
import Box from './entities/Box';

const MARINE_URL = '/assets/marine/marine_anims_core.json';

function world(callback, assets) {
	let texture = new THREE.TextureLoader().load('models/box/wood_texture.jpg');
	generateBoundary(9).forEach((point) => {
		let box = new Box(texture);
		box.setPosition(point);
		callback(box);
	})
	const box1 = new Box(texture);
	box1.setPosition(new THREE.Vector3(0, -1, 0));
	const box2 = new Box(texture);
	box2.setPosition(new THREE.Vector3(0, 1, 0));
	callback(box1);
	callback(box2);
}

function generateBoundary(length) {
	let half = Math.floor(length/2);
	let points = [];
	for(let dist = 0; dist < length; dist++) {
		points.push(new THREE.Vector3(-half + dist, -half, 0));
		points.push(new THREE.Vector3(-half + dist, half, 0));
		points.push(new THREE.Vector3(-half, -half+dist, 0));
		points.push(new THREE.Vector3(half, -half+dist, 0));
	}
	return points;
}

function player(callback, assets) {
	//assets.getModel('Marine', model => {
	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Player(model);
		marine.mesh.scale.set(0.008,0.008,0.008);
		marine.mesh.rotation.x = 90 * Math.PI / 180;
		//marine.mesh.rotation.y = -90 * Math.PI / 180;
		callback(marine);
	});
}

export default { world, player };
