import * as THREE from 'three';

import CollisionEngine from './utilities/Collision/CollisionEngine';
import Player from './entities/Player';
import Explosion from './entities/Explosion';

class World {
  constructor(scene, assets) {
    this.clock = new THREE.Clock();
    this.scene = scene;
    this.assets = assets;

    this.collisions = new CollisionEngine();

    this.entities = [];
    // player ∈ players
    this.players = {};
    this.addPlayer('LOCAL_PLAYER', (player) => {
      this.player = player;
    });

  }

  onAction(action, stop=false) {
    if (this.player !== undefined) {
      this.player.onAction(action, stop);
    }
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

  createExplosion(x, y) {
    let explosion = new Explosion(x, y);

    this.entities.push(explosion);
    this.scene.add(explosion.mesh);

    setTimeout(() => {
  		this.entities.splice(this.entities.indexOf(explosion), 1);
  		this.scene.remove(explosion.mesh);
  	}, 1000);
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.scene.add(entity.mesh);
  }

  addPlayer(name, callback) {
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
