import * as THREE from 'three';

class Entity {
  constructor(position) {
    this.mesh;
    this.position = position;
  }

  setPosition(position) {
    this.position = position;
    this.mesh.position.set(position.x, position.y, position.z);
  }

  update() {

  }
}

export default Entity;
