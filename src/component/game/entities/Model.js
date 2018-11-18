import * as THREE from 'three';
import Entity from './Entity';

class Model extends Entity {
  constructor(model) {
    super();
    this.mesh = this._getMeshFromModel(model);

    if (this.mesh === undefined) {
      throw new Error('Could not extract mesh from model');
    }
  }

  _getMeshFromModel(model) {
  	let traverseMesh;
		model.traverse((child) => {
			if (child instanceof THREE.SkinnedMesh) {
				traverseMesh = child;
			}
		});

		return traverseMesh;
  }
}

export default Model;
