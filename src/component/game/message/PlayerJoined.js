import * as THREE from 'three';

class PlayerJoinedHandler {
  constructor(client) {
    this.c = client;
    this.w = client.world;
  }

  handle(message) {
    this.w.addPlayer(message.name, (p) => {
      p.setPosition(new THREE.Vector3(-5,-1,0));
      alert('Player ' + message.name + ' joined');
    });
  }
}

export default PlayerJoinedHandler;
