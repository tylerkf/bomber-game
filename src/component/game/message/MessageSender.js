
class MessageSender {

  constructor(client, ws) {
    this.ws = ws;
    this.world = client.world;

    this.start = this.start.bind(this);
  }

  start() {
    setInterval(() => {
      if(this.world.player !== undefined) {
        let pos = this.world.player.position;
        this.ws.send(JSON.stringify({
          type: 'position',
          x: pos.x,
          y: pos.y,
          z: pos.z
        }));
      }
    }, 33);
  }


}

export default MessageSender;
