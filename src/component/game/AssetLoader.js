
class AssetLoader() {
  constructor(config) {
    this.config = config;
    this.loaded = {'textures': {}, 'models': {}};

    this.textureLoader = new THREE.TextureLoader();
    this.objectLoader = new THREE.ObjectLoader();
  }

  getTexture(texture, callback) {
    if(this.loaded['textures'].hasOwnProperty(texture) {
      callback(this.loaded['textures'][texture]);
    } else {
      this.textureLoader.load(this.config['textures'][texture]['url'],
        item => {
          this.loaded['textures'][texture] = item;
          callback(item);
        }
      );
    }

  }

  getModel(model, callback) {
    if(this.loaded['models'].hasOwnProperty(model) {
      callback(this.loaded['models'][model]);
    } else {
      this.objectLoader.load(this.config['models'][model]['url'],
        item => {
          this.loaded['models'][model] = item;
          callback(item);
    	  }
      );
    }
  }
}
