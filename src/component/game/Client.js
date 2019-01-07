import AssetLoader from './utilities/Asset/AssetLoader';
import MessageReciever from './message/MessageReciever';
import MessageSender from './message/MessageSender';
import Controls from './Controls';
import World from './World';
import Scene from './Scene';

import testWorld from './utilities/Test/testWorld';

class Client {
  constructor(config, canvas, onConsoleMessage, setTitleMessage) {
    this.assets = new AssetLoader();

		this.scene = new Scene(canvas);
		this.world = new World(this.scene, this.assets);
    this.controls = new Controls(this.world, this);

    this.onConsoleMessage = onConsoleMessage;
    this.username = config.username;

    if(config.url && config.username) {
      onConsoleMessage('Connecting to ' + config.url, '');

      let query = config.url + '?name=' + config.username;

      this.ws = new WebSocket(query);
      this.ws.onclose = (event) => {
        if (event.code === 3001) {
          onConsoleMessage('Connection stopped', 'error');
        } else {
          onConsoleMessage('Connection failed', 'error');
        }
      };
      this.reciever = new MessageReciever(this, this.ws, onConsoleMessage, setTitleMessage);
      this.sender = new MessageSender(this, this.ws);

      this.ws.onopen = () => {
        this.reciever.start();
        this.sender.start();
      }

    } else {
      testWorld.populate(this.world);
      onConsoleMessage('You are in an offline world');
    }

    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);
  }

  close() {
    if(this.ws) {
      this.ws.onclose = () => {};
      this.ws.close();
    }
    if(this.sender) {
      this.sender.stop();
    }
    cancelAnimationFrame(this.nextAnimationFrame);
  }

  update(time) {
		this.nextAnimationFrame = requestAnimationFrame(this.update);

		this.world.update();
		this.scene.render();
	}

}

export default Client;
