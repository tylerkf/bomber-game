import * as THREE from 'three';

import Box from '../../entities/Box';
import Bomb from '../../entities/Bomb';

class GameStateUpdateHandler {
  constructor(client) {
    this.c = client;
    this.w = client.world;
    this.pendingPlayers = [];

    this.handle = this.handle.bind(this);
  }

  handle(message) {
    message.players.forEach(details => {

      if(details.name === this.c.username) {
        if(typeof this.w.player !== 'undefined') {
          // has died
          if(!this.w.player.isdead && details.isdead) {
            this.c.scene.remove(this.w.player.mesh);
          }
          // has spawned
          if(this.w.player.isdead && !details.isdead) {
            this.c.scene.add(this.w.player.mesh);
          }
          this.w.player.isdead = details.isdead;

          let difX = this.w.player.position.x - details.position[0];
          let difY = this.w.player.position.y - details.position[1];
          let difZ = this.w.player.position.z - details.position[2];
          if(Math.abs(difX) > 1 || Math.abs(difY) > 1 || Math.abs(difZ) > 1) {
            this._updatePlayer(this.w.player, details);
          }
        }
        return;
      }

      let player = this.w.players.find(p => p.name === details.name);
      if(player) {
        this._updatePlayer(player, details);
      }

    });

    message.events.forEach(event => {
      switch(event.type) {
        case 'player added':
          if(event.name === this.c.username) {
            return;
          }
          this.pendingPlayers.push(event.name)
          let details = message.players.find(p => p.name === event.name);
          this.w.addPlayer(event.name, (p) => {
            this._updatePlayer(p, details);
            this.pendingPlayers.splice(this.pendingPlayers.indexOf(event.name), 1);
          });
          break;
        case 'player removed':
          this.w.removePlayer(event.name);
          break;
        case 'entity added':
          switch(event.object.type) {
            case 'box':
              this._addBox(event.tag, event.object);
              break;
            case 'bomb':
              this._addBomb(event.tag, event.object);
              break;
            default:
              console.error('Unknown event object added' + event.object.type);
          }
          break;
        case 'entity moved':
          let entity = this.w.getEntityByTag(event.tag);
          if(entity) {
            entity.setPosition(new THREE.Vector3(event.position[0], event.position[1], 0));
          } else {
            console.error('Event: could not find to move tag:' + event.tag);
          }
          break;
        case 'entity removed':
          this.w.deleteEntityByTag(event.tag);
          break;
        case 'explosion':
          this.w.createExplosion(event.position[0], event.position[1]);
          break;
        default:
          break;
      }
    })
  }

  _addBomb(tag, details) {
    let pos = details.position;
    const bomb = new Bomb(details.level);
    bomb.tag = tag;
    bomb.setPosition(new THREE.Vector3(pos[0], pos[1], 0));
    this.w.addEntity(bomb);
  }

  _addBox(tag, details) {
    let pos = details.position;
    this.c.assets.getTexture(details.texture, texture => {
      const box = new Box(pos[0], pos[1], texture);
      box.tag = tag;
      this.w.addEntity(box);
    });
  }

  _updatePlayer(player, details) {
    player.setPosition(new THREE.Vector3(details.position[0],details.position[1],details.position[2]));
    player.velocity = new THREE.Vector3(details.velocity[0],details.velocity[1],details.velocity[2]);
    player.state = details.state;
    player.isdead = details.isdead;
  }
}

export default GameStateUpdateHandler;
