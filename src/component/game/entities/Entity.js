import * as THREE from 'three';

class Entity {
  constructor() {
    this.mesh;
    this.position = new THREE.Vector3();
    this.angle = 0;
  }

  setPosition(position) {
    this.position = position;
    this.mesh.position.set(position.x, position.y, position.z);
  }

  setAngle(angle) {
    this.angle = angle;
    this.mesh.rotation.y = angle;
  }

  update() {

  }
}

export default Entity;
