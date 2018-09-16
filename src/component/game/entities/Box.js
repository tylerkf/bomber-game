import * as THREE from 'three';
import Entity from './Entity';

class Box extends Entity {
  constructor() {
    super(null);

    let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );

    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Box;
