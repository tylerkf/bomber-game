import * as THREE from 'three';
import Model from './model';

class Animated extends Model {
  constructor(model) {
    super(model);

    this.mixer = new THREE.AnimationMixer(this.mesh);
    // set up mixer
  }
}

export default Animated;