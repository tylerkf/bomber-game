import * as THREE from 'three';

class Entity {
  constructor() {
    this.mesh;
    this.position = new THREE.Vector3(0, 0, 0);
  }

  setPosition(position) {
    this.position = position;
    this.mesh.position.set(position.x, position.y, position.z);
  }

  update() {

  }
}

export default Entity;
