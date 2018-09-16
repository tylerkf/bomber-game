import * as THREE from 'three';
import Player from './entities/Player';
import Box from './entities/Box';

const MARINE_URL = '/models/marine/marine_anims_core.json';

function world(callback) {
	const box = new Box();
	box.setPosition(new THREE.Vector3(0,0,0));
	callback(box);
}

function player(callback) {
	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Player(model);
		marine.mesh.scale.set(0.1,0.1,0.1);
		callback(marine);
	});
}

export default { world, player };
