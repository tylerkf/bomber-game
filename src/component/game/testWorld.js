import * as THREE from 'three';
import Player from './entities/Player';
import Box from './entities/Box';
import Bomb from './entities/Bomb';
import Floor from './entities/Floor';

function world(callback, assets) {
	assets.getTexture('Wood', texture => {
		const box1 = new Box(texture);
		box1.setPosition(new THREE.Vector3(0, -1, 0));
		const box2 = new Box(texture);
		box2.setPosition(new THREE.Vector3(0, 1, 0));
		callback(box1);
		callback(box2);
	});

	generateBoundary(9).forEach((point) => {
		assets.getTexture('Stone', texture => {
			let box = new Box(texture);
			box.setPosition(point);
			callback(box);
		});
	});

	assets.getTexture('Grid', texture => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 4, 4 );
		const floor = new Floor(texture, 7, 7);
		floor.setPosition(new THREE.Vector3(0, 0, -0.5));
		callback(floor);
	})

	let bomb1 = new Bomb(1);
	bomb1.setPosition(new THREE.Vector3(3, -2, 0));
	let bomb2 = new Bomb(2);
	bomb2.setPosition(new THREE.Vector3(-2, 3, 0));
	callback(bomb1);
	callback(bomb2);
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
	assets.getModel('Marine', model => {
		const marine = new Player(model);
		marine.mesh.scale.set(0.008,0.008,0.008);
		marine.mesh.rotation.x = 90 * Math.PI / 180;
		callback(marine);
	});
}

export default { world, player };
