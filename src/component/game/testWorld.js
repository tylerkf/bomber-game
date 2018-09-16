import * as THREE from 'three';
import Person from './entities/Person';
import Box from './entities/Box';

const MARINE_URL = '/models/marine/marine_anims_core.json';

function world(callback) {
	const box = new Box();
	box.setPosition(new THREE.Vector3(0,0,0));
	callback(box);
}

function player(callback) {
	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Person(model);
		marine.addAnimationTarget('run', 1, 0.5);
		marine.addAnimationTarget('idle', 0, 0.5);
		marine.mesh.scale.set(0.1,0.1,0.1);
		callback(marine);
	});
}

export default { world, player };
