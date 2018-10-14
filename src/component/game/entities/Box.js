import * as THREE from 'three';
import Entity from './Entity';
import StaticCollider from '../utilities/Collision/StaticCollider';

class Box extends Entity {
  constructor(x, y, texture) {
    super();

    this.collider = new StaticCollider(x, y, 1, 1);

    let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({map: texture});
    this.mesh = new THREE.Mesh(geometry, material);

    this.setPosition(new THREE.Vector3(x, y, 0.5));
  }
}

export default Box;
