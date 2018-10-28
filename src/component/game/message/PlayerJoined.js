import * as THREE from 'three';

class PlayerJoinedHandler {
  constructor(client) {
    this.c = client;
  }

  handle(message) {
    alert('Attempting to load player '  + message.name);

    this.c.world.addPlayer(message.name, (p) => {
      p.setPosition(new THREE.Vector3(-5,-1,0));
    });
  }
}

export default PlayerJoinedHandler;
