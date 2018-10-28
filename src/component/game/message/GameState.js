import * as THREE from 'three';

import Box from '../entities/Box';
import Bomb from '../entities/Bomb';

class GameStateHandler {
  constructor(client) {
    this.c = client;
    this.w = client.world;
  }

  handle(message) {
    alert('Attempting to load game state from server');

    message.players.forEach(p => {
      if(p.name !== this.c.username) {
        this.w.addPlayer(p.name, (p) => {
          p.setPosition(new THREE.Vector3(p.position[0],p.position[1],p.position[2]));
        });
      }
    });

    message.map.boxes.forEach(boxDetails => {
      let textureName = boxDetails[2];
      this.c.assets.getTexture(textureName, texture => {
    		const box = new Box(boxDetails[0], boxDetails[1], texture);
        this.w.addEntity(box);
    	});
    })

    message.map.bombs.forEach(bombDetails => {
      let position = bombDetails[0];
      let level = bombDetails[1];

      const bomb = new Bomb(level);
    	bomb.setPosition(new THREE.Vector3(position[0], position[1], 0));
    	this.w.addEntity(bomb);

    })

    alert('Game state loaded successfully');

  }
}

export default GameStateHandler;
