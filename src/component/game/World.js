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
    this.players = [];
    this.addPlayer('LOCAL_PLAYER', (player) => {
      this.player = player;
    });

    this.update = this.update.bind(this);
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
    // update players
    for (let i= 0; i < this.players.length; i++) {
      this.players[i].update(delta);
    }

    if (this.player !== undefined) {
      // check collisions
      this.collisions.run(this.player, this.entities, delta);

      // update scene to follow player
      if(this.player.isdead) {
        this.scene.update(new THREE.Vector3(0, 0, 0));
      } else {
        this.scene.update(this.player.position);
      }
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

  getEntityByTag(tag) {
    return this.entities.find(entity => entity.tag && entity.tag === tag);
  }

  deleteEntityByTag(tag) {
    let entity = this.getEntityByTag(tag);
    this.scene.remove(entity.mesh);
    this.entities = this.entities.filter(entity => !entity.tag || entity.tag !== tag)
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
      this.players.push(player);

      callback(player);
  	});
  }

  removePlayer(name) {
    let player = this.players.find(p => p.name === name);
    this.players = this.players.filter(p => p.name !== player.name);
    this.scene.remove(player.mesh);
  }

};

export default World;
