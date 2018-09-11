import * as THREE from 'three';

class Model {
  constructor(model) {
    this.mesh = this._getMeshFromModel(model)

    if (this.mesh === undefined) {
    	// throw error
    }
  }

  _getMeshFromModel(model) {
  	let traverseMesh;
		model.traverse((child) => {
			if (child instanceof THREE.SkinnedMesh) {
				traverseMesh = child;
			}
		});

		return traverseMesh
  }
}

export default Model;