// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',

  init: function() {},

  send: function(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    }); 
  },

  fetch: function() {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },

  clearMessages: function() {
    var messages = $('#chats').children();
    for (var i = 0; i < messages.length; i++) {
      messages[i].remove();
    }
  },

  renderMessage: function(message) {
    var messages = $('#chats');
    var node = $(`<div>${message.text}</div>`);
    messages.append(node);
  },

  renderRoom: function(roomName) {
    var rooms = $('#roomSelect');
    var roomNode = $(`<div>${roomName}</div>`);
    rooms.append(roomNode);
  }
};
