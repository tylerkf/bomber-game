import AssetLoader from './utilities/Asset/AssetLoader';
import Controls from './Controls';
import World from './World';
import Scene from './Scene';

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
      const ws = new WebSocket(query);

      ws.onmessage = this.onMessage;

      console.log('You are online');

    } else {
      this.world.populateWithLocalEntities();
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

}

export default Client;
