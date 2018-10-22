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

    this.username = config.username;

    if(config.url && config.username) {
      alert('Connecting ' + config.username + ' to ' + config.url);
      let query = config.url + '?name=' + config.username;
      const ws = new WebSocket(query);
      ws.onmessage = this.onMessage;
    }

  }

  onMessage = (data) => {
    let message = JSON.parse(data.data);

    if(message.type === 'player joined') {
      this.connectedPlayers[message.name] = {};
      alert('Player ' + message.name + ' joined!');

      this.world.addPlayer('newplayer', false, (p) => {
        p.setPosition(new THREE.Vector3(-5,-1,0));
      });
      /*
      this.world.addPlayer(message.name, false, (newPlayer) => {
        this.connectedPlayers[message.name] = newPlayer;
      });
      */

    } else if (message.type === 'player position') {
      let target = this.connectedPlayers[message.name];
      if(target != {}) {
        target.updatePosition(
          new THREE.Vector3(message.position[0],message.position[1],message.position[2])
        );
      }

    } else if (message.type === 'game state') {
      this.connectedPlayers = {};

      message.players.forEach(p => {
        if(p.name !== this.username) {
          this.connectedPlayers[p.name] = {};

          this.world.addPlayer(p.name, false, (newPlayer) => {
            this.connectedPlayers[p.name] = newPlayer;

            newPlayer.updatePosition(
              new THREE.Vector3(p.position[0],p.position[1],p.position[2])
            );
          });
        }
      });

    }

  }

}

export default Client;
