import * as THREE from 'three';
import Person from './entities/Person';

const MARINE_URL = '/models/marine/marine_anims_core.json';

function world(callback) {
	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Person(model);
		marine.addAnimationTarget('run', 1, 0.5);
		marine.addAnimationTarget('idle', 0, 0.5);

		callback(marine);
	});
}

function player(callback) {
	new THREE.ObjectLoader().load((MARINE_URL), model => {
		const marine = new Person(model);
		marine.addAnimationTarget('run', 1, 0.5);
		marine.addAnimationTarget('idle', 0, 0.5);

		callback(marine);
	});
}

export default { world, player };
