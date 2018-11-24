import AssetLoader from './utilities/Asset/AssetLoader';
import MessageReciever from './message/MessageReciever';
import MessageSender from './message/MessageSender';
import Controls from './Controls';
import World from './World';
import Scene from './Scene';

import testWorld from './utilities/Test/testWorld';

class Client {
  constructor(config, canvas, onConsoleMessage) {
    this.assets = new AssetLoader();

		this.scene = new Scene(canvas);
		this.world = new World(this.scene, this.assets);
    this.controls = new Controls(this.world);

    this.username = config.username;

    if(config.url && config.username) {
      alert('Connecting ' + config.username + ' to ' + config.url);

      let query = config.url + '?name=' + config.username;
      this.ws = new WebSocket(query);

      let receiver = new MessageReciever(this, this.ws, onConsoleMessage);
      let sender = new MessageSender(this, this.ws);

      console.log('You are online');

    } else {
      testWorld.populate(this.world);

      this.world.addPlayer('Test', (p) => {
        p.onAction('walkForwards',false);
      });
      onConsoleMessage('You are in an offline world');
    }

  }


}

export default Client;
