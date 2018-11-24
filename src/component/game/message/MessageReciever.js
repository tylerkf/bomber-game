import PlayerPositionHandler from './recieve/PlayerPosition';
import PlayerJoinedHandler from './recieve/PlayerJoined';
import GameStateHandler from './recieve/GameState';

class MessageReciever {
  constructor(client, ws, onConsoleMessage) {
    this.handlers = {};
    this.handlers['player position'] = new PlayerPositionHandler(client);
    this.handlers['player joined'] = new PlayerJoinedHandler(client);
    this.handlers['game state'] = new GameStateHandler(client);

    this.onConsoleMessage = onConsoleMessage;

    ws.onmessage = this.onMessage;

    setInterval(() => {
      this.onConsoleMessage('hello, this is from the client!', 'harvey');
    }, 1000);
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
