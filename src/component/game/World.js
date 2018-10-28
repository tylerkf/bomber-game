import * as THREE from 'three';

import testWorld from './utilities/Test/testWorld';
import CollisionEngine from './utilities/Collision/CollisionEngine';
import Player from './entities/Player';

class World {
  constructor(scene, assets) {
    this.clock = new THREE.Clock();
    this.scene = scene;
    this.assets = assets;

    this.collisions = new CollisionEngine();

    this.entities = [];
    // players ⊆ player
    this.players = {};
    this.addPlayer('LOCAL_PLAYER', (player) => {
      this.player = player;
    });

  }

  populateWithLocalEntities() {
    testWorld.world((entity, assets) => {
      this.entities.push(entity);
      this.scene.add(entity.mesh);
    }, this.assets);
  }

  onAction(action, stop=false) {
    this.player.onAction(action, stop);
  }

	update() {
    const delta = this.clock.getDelta();

    // update entities
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(delta);
    }

    if (this.player !== undefined) {
      this.player.update(delta);

      // check collisions
      this.collisions.run(this.player, this.entities, delta);

      this.scene.camera.position.x = this.player.position.x;
      this.scene.camera.position.y = this.player.position.y;
    }
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.scene.add(entity.mesh);
  }

  addPlayer(name='Player', callback) {
    this.assets.getModel('Marine', model => {
  		const player = new Player(model, name);

  		player.mesh.scale.set(0.008,0.008,0.008);
  		player.mesh.rotation.x = 90 * Math.PI / 180;
      this.scene.add(player.mesh);

      this.players[name] = player;

      callback(player);
  	});
  }

};

export default World;
