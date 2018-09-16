import * as THREE from 'three';
import Entity from './Entity';

class Box extends Entity {
  constructor() {
    super(null);

    let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );

    let loader = new THREE.CubeTextureLoader();
    loader.setPath( 'textures/cube/pisa/' );

    var textureCube = loader.load( [
	     'px.png', 'nx.png',
	      'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

    this.mesh = new THREE.Mesh( geometry, material );
  }
}

export default Box;
