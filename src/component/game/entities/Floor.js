import * as THREE from 'three';
import Entity from './Entity';
import Collisions from '../Collisions';

class Floor extends Entity {
  constructor(texture, width, height) {
    super(null);

    let geometry = new THREE.PlaneGeometry( width, height );
    let material = new THREE.MeshLambertMaterial({map: texture});
    

    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Floor;
