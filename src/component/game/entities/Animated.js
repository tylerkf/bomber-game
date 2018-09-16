import * as THREE from 'three';
import Model from './Model';

class Animated extends Model {
  constructor(model, defaultAnimation=undefined) {
    super(model);

    this.mixer = new THREE.AnimationMixer(this.mesh);
    this.animations = this.mesh.animations || this.mesh.geometry.animations;

    // initialise animations and targets object
    for (let i = 0; i < this.animations.length; i++) {
      const name = this.animations[i].name;
    	const action = this.mixer.clipAction(name);

    	action.setEffectiveWeight(0);
    	action.play();
    }

    // play default animation
    if (defaultAnimation !== undefined) {
    	this.defaultAnimation = defaultAnimation;
    } else {
    	this.defaultAnimation = this.animations[0].name;
    }
    const defaultAction = this.mixer.clipAction(this.defaultAnimation);
  	defaultAction.setEffectiveWeight(1);
  }

  setAnimationWeights(weights) {
    const animationNames = Object.keys(weights)

    let totalChange = 0;
    for (let i = 0; i < animationNames.length; i++) {
      const name = animationNames[i];
    	const action = this.mixer.clipAction(name);

      totalChange += weights[name] - action.getEffectiveWeight();

      action.setEffectiveWeight(weights[name]);
    }

    // prevents T-posing
  	if (totalChange != 0) {
			const defaultAction = this.mixer.clipAction(this.defaultAnimation);
			const newWeight = defaultAction.getEffectiveWeight() - totalChange;
			defaultAction.setEffectiveWeight(newWeight);
		}
  }

  update(delta) {
    super.update(delta);

		// update mixer
		this.mixer.update(delta);
  }
}

export default Animated;
