import * as THREE from 'three';

class PlayerPositionHandler {
  constructor(client) {
    this.c = client;
  }

  handle(message) {
    let target = this.c.world.players[message.name];
    target.setPosition(
      new THREE.Vector3(message.position[0],message.position[1],message.position[2])
    );
  }
}

export default PlayerPositionHandler;
