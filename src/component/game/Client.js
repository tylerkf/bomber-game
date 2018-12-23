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

    this.onConsoleMessage = onConsoleMessage;
    this.username = config.username;

    if(config.url && config.username) {
      onConsoleMessage('Connecting ' + config.username + ' to ' + config.url, 'debug');

      let query = config.url + '?name=' + config.username;

      this.ws = new WebSocket(query);
      this.reciever = new MessageReciever(this, this.ws, onConsoleMessage);
      this.sender = new MessageSender(this, this.ws);

      this.ws.onopen = () => {
        this.reciever.start();
        this.sender.start();
        onConsoleMessage('Connected successfully', 'debug');
      }

    } else {
      testWorld.populate(this.world);
      onConsoleMessage('You are in an offline world');
    }

    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);
  }

  update(time) {
		requestAnimationFrame(this.update);

		this.world.update();
		this.scene.render();
	}

}

export default Client;
