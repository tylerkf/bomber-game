import * as THREE from 'three';
import testWorld from './testWorld';
import Collisions from './Collisions';

class World {
  constructor(scene) {
    this.clock = new THREE.Clock();
    this.scene = scene;

    this.collisions = new Collisions();

    this.entities = [];

    testWorld.world(entity => {
      this.entities.push(entity);
      console.log(entity.position);
      this.collisions.addBox('id', entity.position.x, entity.position.y);
      this.scene.add(entity.mesh);
    });

    testWorld.player(entity => {
      this.entities.push(entity);
      entity.collisions = this.collisions;
      this.scene.add(entity.mesh);
      this.player = entity;
    });
  }

  onAction(action, stop=false) {
    this.player.onAction(action, stop);
  }

	update() {
    const delta = this.clock.getDelta();

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(delta);
    }

    if (this.player !== undefined) {
      this.scene.camera.position.x = this.player.position.x;
      this.scene.camera.position.z = this.player.position.z;
    }
  }
};

export default World;
