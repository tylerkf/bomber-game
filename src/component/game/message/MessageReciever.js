import PlayerPositionHandler from './recieve/PlayerPosition';
import PlayerJoinedHandler from './recieve/PlayerJoined';
import GameStateHandler from './recieve/GameState';
import ConsoleMessageHandler from './recieve/ConsoleMessage';

class MessageReciever {

  constructor(client, ws, onConsoleMessage) {
    this.ws = ws;
    this.handlers = {};
    this.handlers['player position'] = new PlayerPositionHandler(client);
    this.handlers['player joined'] = new PlayerJoinedHandler(client);
    this.handlers['game state'] = new GameStateHandler(client);
    this.handlers['console message'] = new ConsoleMessageHandler(onConsoleMessage);

    this.onConsoleMessage = onConsoleMessage;

    this.start = this.start.bind(this);
  }

  start() {
    this.ws.onmessage = this.onMessage;
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

export default MessageReciever;
