import * as THREE from 'three';
import testWorld from './testWorld';
import Collisions from './Collisions';

class World {
  constructor(scene, controls, assets) {
    this.clock = new THREE.Clock();
    this.scene = scene;
    this.controls = controls;
    this.assets = assets;

    this.collisions = new Collisions();

    this.entities = [];
    this.animated = [];

    testWorld.world((entity, assets) => {
      this.entities.push(entity);
      this.scene.add(entity.mesh);
    }, assets);

    testWorld.player((entity, assets) => {
      this.entities.push(entity);
      this.animated.push(entity);
      this.scene.add(entity.mesh);
      this.player = entity;
    }, assets);
  }

  onAction(action, stop=false) {
    this.player.onAction(action, stop);
  }

	update() {
    const delta = this.clock.getDelta();

    // update velocities
    for (let i = 0; i < this.animated.length; i++) {
      this.animated[i].updateVelocity(delta);
    }

    // check collisions
    this.collisions.run(this.entities, delta);

    // update entities
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(delta);
    }

    if (this.player !== undefined) {
      this.scene.camera.position.x = this.player.position.x;
      this.scene.camera.position.y = this.player.position.y;
    }
  }
};

export default World;
