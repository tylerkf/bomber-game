import * as THREE from 'three';
import Player from './entities/Player';
import Box from './entities/Box';

const MARINE_URL = '/models/marine/marine_anims_core.json';

function world(callback) {
	const box1 = new Box();
	box1.setPosition(new THREE.Vector3(1,0,0));
	const box2 = new Box();
	box2.setPosition(new THREE.Vector3(0,0,1));
	callback(box1);
	callback(box2);
}

function player(callback) {
	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Player(model);
		marine.mesh.scale.set(0.008,0.008,0.008);
		marine.mesh.rotation.y = -90 * Math.PI / 180;
		callback(marine);
	});
}

export default { world, player };
