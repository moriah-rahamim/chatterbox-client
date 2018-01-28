// YOUR CODE HERE:

var memoizedSubmitListener = _.once( function() {
  $('#send .submit').submit(function( event ) {
    app.handleSubmit();
  });
});

var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',

  init: function() {
    $('.username').click(function() {
      app.handleUsernameClick.apply(this);
    });
    memoizedSubmitListener();
  },

  handleUsernameClick: function() {
    var userName = $(this).text();
    var messages = $('.chat');
    messages.map(function() {
      var userString = $(this.children[0]).text();
      if (userString === userName) {
        $(this).css('font-weight', 'bold');
      } 
    });
  },

  handleSubmit: function() {
    // get text from input box
    // debugger;
    var text = $('#message').val();
    // console.log('test');
    // var name = 'moriah';
    // name = name.replace('?username=', '');
    // var roomname = 'main'; // NOTE TO SELF: edit later

    var message = {
      username: 'testname',
      text: text,
      roomname: 'testroom'
    };
    // call this.send with whatever was typed in
    app.send(message);
    
  },

  send: function(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      // data: JSON.stringify(message),
      data: message,
      // contentType: 'application/json',
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
    var dataStuff = $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.renderAllMessages(data);
        setTimeout(function() {
          app.renderAllMessages(data);
        }, 200);
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
    return dataStuff;
  },

  clearMessages: function() {
    var messages = $('#chats').children();
    for (var i = 0; i < messages.length; i++) {
      messages[i].remove();
    }
  },

  renderAllMessages: function(data) {
    console.log('foo');
    console.log(data.results[0]);
    for (var i = 0; i < data.results.length; i++) {
      app.renderMessage(data.results[i]);
    }
  },

  renderMessage: function(message) {
    var messages = $('#chats');
    var username = _.escape(message.username);
    var text = _.escape(message.text);

    var node = $(`<div class="chat">${text}</div>`);
    var userNode = $(`<div class="username">${username}</div>`);
    node.prepend(userNode);
    messages.append(node);
  },

  renderRoom: function(roomName) {
    var rooms = $('#roomSelect');
    roomName = _.escape(roomName);
    var roomNode = $(`<div>${roomName}</div>`);
    rooms.append(roomNode);
  },

  escape: function(string) {
    string = string.replace('</', '&lt;&#47;');
    string = string.replace('<', '&lt;');
    string = string.replace('>', '&gt;');
    return string;
  }
};
