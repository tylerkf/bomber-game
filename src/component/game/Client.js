import AssetLoader from './utilities/Asset/AssetLoader';
import Controls from './Controls';
import World from './World';
import Scene from './Scene';

import testWorld from './utilities/Test/testWorld';

import PlayerPositionHandler from './message/PlayerPosition';
import PlayerJoinedHandler from './message/PlayerJoined';
import GameStateHandler from './message/GameState';

class Client {
  constructor(config, canvas) {
    this.assets = new AssetLoader();

		this.scene = new Scene(canvas);
		this.world = new World(this.scene, this.assets);
    this.controls = new Controls(this.world);

    this.username = config.username;

    if(config.url && config.username) {
      alert('Connecting ' + config.username + ' to ' + config.url);

      this.handlers = {};
      this.handlers['player position'] = new PlayerPositionHandler(this);
      this.handlers['player joined'] = new PlayerJoinedHandler(this);
      this.handlers['game state'] = new GameStateHandler(this);

      let query = config.url + '?name=' + config.username;
      this.ws = new WebSocket(query);
      this.ws.onmessage = this.onMessage;
      this.setupInformMovement = this.setupInformMovement.bind(this);
      setTimeout(this.setupInformMovement, 1000);

      console.log('You are online');

    } else {
      testWorld.populate(this.world);
      console.log('You are in an offline world');
    }

  }

  onMessage = (data) => {
    try {
      let message = JSON.parse(data.data);
      this.handlers[message.type].handle(message);
    } catch(error) {
      console.error('Failed to handle server message:');
      console.error(error);
    }
  }

  setupInformMovement() {
    setInterval(() => {
      let pos = this.world.player.position;
      this.ws.send(JSON.stringify({
        type: 'position',
        x: pos.x,
        y: pos.y,
        z: pos.z
      }));
    }, 33);
  }

}

export default Client;
