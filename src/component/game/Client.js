import * as THREE from 'three';

import AssetLoader from './utilities/Asset/AssetLoader';
import Controls from './Controls';
import World from './World';
import Scene from './Scene';

class Client {
  constructor(config, canvas) {
    this.assets = new AssetLoader();

		this.scene = new Scene(canvas);
		this.world = new World(this.scene, this.assets);
    this.controls = new Controls(this.world);

    this.world.addPlayer(config.username, true, () => {});

    this.connectedPlayers = {};

    if(config.url && config.username) {
      alert('Connecting ' + config.username + ' to ' + config.url);
      let query = config.url + '?name=' + config.username;
      this.ws = new WebSocket(query);

      this.ws.onmessage = message => {
        let packet = JSON.parse(message);
        packet.forEach(player => {
          if(!(player.name in this.connectedPlayers)) {

            this.world.addPlayer(player.name, false, (player) => {
              this.connectedPlayers[player.name] = player;

              player.updatePosition(
                new THREE.Vector3(player.position[0],player.position[1],player.position[2])
              );
            })

          } else {

            let target = this.connectedPlayers[player.name];
            target.updatePosition(
              new THREE.Vector3(player.position[0],player.position[1],player.position[2])
            );

          }


        });
      };
    }

  }
}

export default Client;
