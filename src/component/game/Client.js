class Client {
  constructor(config, world, name) {
    this.world = world;

    this.connectedPlayers = {};

    let query = config.url + '?name=' + name;
    this.ws = new WebSocket(query);

    this.ws.onmessage = message => {
      let packet = JSON.parse(message);
      packet.forEach(player => {

      });
    };
  }
}

export default Client;
