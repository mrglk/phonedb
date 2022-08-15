class EventEmitter {
    listeners = {};
  
    fire(event) {
      for (var k in this.listeners) {
        let listener = this.listeners[k];
        this.unregister(k);
        listener(event);
      }
    }
  
    register(id, listener) {
      this.listeners[id] = listener;
    }
  
    unregister(id) {
      return delete this.listeners[id];
    }
  }
  
  module.exports = EventEmitter;