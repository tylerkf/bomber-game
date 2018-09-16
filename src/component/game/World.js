import * as THREE from 'three';
import testWorld from './testWorld';

class World {
  constructor(scene) {
    this.clock = new THREE.Clock();
    this.scene = scene;

    this.entities = [];

    testWorld(entity => {
      this.entities.push(entity);
      this.scene.add(entity.mesh);
    });
  }

	update() {
    const delta = this.clock.getDelta();

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(delta);
    }
  }
};

export default World;
