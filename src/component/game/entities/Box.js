import * as THREE from 'three';
import Entity from './Entity';
import Collisions from '../Collisions';

class Box extends Entity {
  constructor(position, texture) {
    super(position);

    this.collisionClass = Collisions.classes.box;
    this.collisionBounds = Collisions.box(position, 1, 1);

    let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({map: texture});
    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Box;
