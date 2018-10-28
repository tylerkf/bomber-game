import * as THREE from 'three';
import config from '../../../../config/assets';

class AssetLoader {
  constructor() {
    THREE.Cache.enabled = true;

    this.textureLoader = new THREE.TextureLoader();
    this.objectLoader = new THREE.ObjectLoader();
  }

  getTexture(texture, callback) {
    this.textureLoader.load(config['textures'][texture]['url'],
      item => {
        callback(item);
      }
    );
  }

  getModel(model, callback) {
    this.objectLoader.load(config['models'][model]['url'],
      item => {
        callback(item);
    	}
    );
  }

}

export default AssetLoader;
