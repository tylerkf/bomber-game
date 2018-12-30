
class ConsoleMessageHandler {
  constructor(onConsoleMessage) {
    this.onConsoleMessage = onConsoleMessage;
  }

  handle(message) {
    this.onConsoleMessage(message.text, message.from);
  }
}

export default ConsoleMessageHandler;
