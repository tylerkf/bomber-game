import * as THREE from 'three';
import Entity from './Entity';

class Bomb extends Entity {
  constructor(level = 1) {
    super();

    let geometry = new THREE.SphereGeometry( 0.5, 13, 13 );
    let material;
    switch(level) {
      case 1:
        material = new THREE.MeshBasicMaterial( {color: 0x24c600} );
        break;
      case 2:
        material = new THREE.MeshBasicMaterial( {color: 0x600000} );
        break;
      default:
        material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    }
    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Bomb;
