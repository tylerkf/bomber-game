import * as THREE from 'three';
import Entity from './Entity';

class Floor extends Entity {
  constructor(width, height, texture) {
    super();

    let geometry = new THREE.PlaneGeometry(width, height);
    let material = new THREE.MeshLambertMaterial({ map: texture });

    this.mesh = new THREE.Mesh(geometry, material);
  }
}

export default Floor;
