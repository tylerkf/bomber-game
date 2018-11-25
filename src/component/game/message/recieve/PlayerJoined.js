import * as THREE from 'three';

class PlayerJoinedHandler {

  constructor(client) {
    this.c = client;
    this.w = client.world;
  }

  handle(message) {
    this.w.addPlayer(message.name, (p) => {
      p.setPosition(new THREE.Vector3(-5,-1,0));
      this.c.onConsoleMessage('Loading player object for ' + message.name, 'debug');
    });
  }

}

export default PlayerJoinedHandler;
