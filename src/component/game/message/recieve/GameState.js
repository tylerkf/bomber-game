import * as THREE from 'three';

import Box from '../../entities/Box';
import Bomb from '../../entities/Bomb';

class GameStateHandler {
  constructor(client, setTitleMessage) {
    this.c = client;
    this.w = client.world;
    this.setTitleMessage = setTitleMessage;
  }

  handle(message) {
    message.players.forEach(details => {
      if(details.name === this.c.username) {
        return;
      }

      this.w.addPlayer(details.name, (p) => {
        this._updatePlayer(p, details);
      });
    });

    message.map.box.forEach(entity => {
      this._addBox(entity.tag, entity.object);
    })

    message.map.bomb.forEach(entity => {
      this._addBomb(entity.tag, entity.object);
    })

    this.setTitleMessage(message.currentTitle);
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
  }
}

export default GameStateHandler;
