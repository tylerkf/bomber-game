import PlayerStateMessage from './send/PlayerState';

class MessageSender {

  constructor(client, ws) {
    this.ws = ws;
    this.world = client.world;

    this.start = this.start.bind(this);
  }

  start() {
    let updatePacket = new PlayerStateMessage(this.world);
    setInterval(() => {
      if(this.world.player !== undefined) {
        this.ws.send(updatePacket.toString());
      }
    }, 33);
  }

}

export default MessageSender;
