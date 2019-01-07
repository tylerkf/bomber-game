import GameStateUpdateHandler from './recieve/GameStateUpdate';
import GameStateHandler from './recieve/GameState';
import ConsoleMessageHandler from './recieve/ConsoleMessage';

class MessageReciever {

  constructor(client, ws, onConsoleMessage, setTitleMessage) {
    this.ws = ws;
    this.handlers = {};
    this.handlers['game state'] = new GameStateHandler(client, setTitleMessage);
    this.handlers['game state update'] = new GameStateUpdateHandler(client, setTitleMessage);
    this.handlers['console message'] = new ConsoleMessageHandler(onConsoleMessage);

    this.onConsoleMessage = onConsoleMessage;
    this.setTitleMessage = setTitleMessage;

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
