import * as THREE from 'three';
import Entity from './Entity';

class Box extends Entity {
  constructor() {
    super(null);

    let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

    let texture = new THREE.TextureLoader().load('models/box/wood_texture.jpg');
    let material = new THREE.MeshLambertMaterial({map: texture});
    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Box;
