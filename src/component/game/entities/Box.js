import * as THREE from 'three';
import Entity from './Entity';

class Box extends Entity {
  constructor(texture) {
    super(null);

    let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    let material = new THREE.MeshLambertMaterial({map: texture});
    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Box;
