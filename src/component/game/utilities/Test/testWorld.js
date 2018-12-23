import * as THREE from 'three';
import Box from '../../entities/Box';
import Bomb from '../../entities/Bomb';
import Floor from '../../entities/Floor';

function populate(world) {
	_worldEntities((entity) => {
		world.addEntity(entity);
	}, world.assets);

	setInterval(() => {
		world.createExplosion(0, 0);
	}, 1000);

	world.addPlayer('npc', (p) => {
		p.setPosition(new THREE.Vector3(3,0,0));
		setInterval(() => {
			const weights = p.velocityToAnimationWeights(new THREE.Vector3(20,0,0));
			p.setAnimationWeights(weights);
		}, 2000);
	});
}

function _worldEntities(callback, assets) {
	assets.getTexture('Wood', texture => {
		const box1 = new Box(0, -1, texture);
		callback(box1);
		const box2 = new Box(0, 1, texture);
		callback(box2);
	});

	_generateBoundary(9).forEach((point) => {
		assets.getTexture('Stone', texture => {
			let box = new Box(point.x, point.y, texture);
			callback(box);
		});
	});

	assets.getTexture('Grid', texture => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 4, 4 );
		const floor = new Floor(7, 7, texture);
		floor.setPosition(new THREE.Vector3(0, 0, 0));
		callback(floor);
	})

	const bomb1 = new Bomb(1);
	bomb1.setPosition(new THREE.Vector3(3, -2, 0));
	callback(bomb1);

	const bomb2 = new Bomb(2);
	bomb2.setPosition(new THREE.Vector3(-2, 3, 0));
	callback(bomb2);
}

function _generateBoundary(length) {
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

export default { populate };
