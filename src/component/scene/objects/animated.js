import * as THREE from 'three';
import Model from './model';

class Animated extends Model {
  constructor(model, defaultAnimation=undefined) {
    super(model);

    this.mixer = new THREE.AnimationMixer(this.mesh);
    this.animations = this.mesh.animations || this.mesh.geometry.animations;
    
    this._animationTargets = {};
    // initialise animations and targets object
    for (let i = 0; i < this.animations.length; i++) {
    	const name = this.animations[i].name;
    	const action = this.mixer.clipAction(name);

    	this._animationTargets[name] = {
    		weight: null,
    		rate: null
    	};
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

  update(delta) {
  	// fade animations
  	let totalWeight = 0;
  	for (let name in this._animationTargets) {
  		const action = this.mixer.clipAction(name);
  		const target = this._animationTargets[name];
  		const currentWeight = action.getEffectiveWeight();

  		totalWeight += currentWeight

  		// weight value is null if no update is needed
  		if (target.weight === null) {
  			continue;
  		}

  		const weightDifference = target.weight - currentWeight;
  		// if fade is complete
  		if (Math.abs(weightDifference) < target.rate * delta) {
  			action.setEffectiveWeight(target.weight);
  			target.weight = null;
  			continue;
  		}

  		const newWeight = currentWeight + target.rate * delta * Math.sign(weightDifference);
  		action.setEffectiveWeight(newWeight);
  	}

  	// prevents T-posing
  	if (totalWeight < 1) {
			const defaultAction = this.mixer.clipAction(this.defaultAnimation);
			const newWeight = defaultAction.getEffectiveWeight() + 1 - totalWeight;
			defaultAction.setEffectiveWeight(newWeight);
		}

		// update mixer
		this.mixer.update(delta);
  }

  addAnimationTarget(name, weight, rate) {
  	this._animationTargets[name].weight = weight;
  	this._animationTargets[name].rate = rate;
  }
}

export default Animated;