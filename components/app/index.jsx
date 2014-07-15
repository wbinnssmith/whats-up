var $ = require('jquery');
var React = require('react');
var Header = require('../header');
var Messages = require('../messages');
var MessageForm = require('../message_form');
var guid = require('guid');
var io = require('socket.io-client');

var ioserver = window.location.protocol + '//' + window.location.hostname + ':8081';
var userId = guid.create().value.split('').slice(0, 4).join('');

function postNewMessage(message) {
  $.ajax({
    type: "POST",
    url: ioserver + '/messages',
    data: JSON.stringify({user_id: userId, text: message, created_at: {date: +new Date()}}),
    contentType: "application/json"
  });
}

function notify(message) {
  if(!window.Notification) return;
  function send() {
    if(Notification.permission === "granted") {
      new Notification(message.text);
    }
  }

  if(Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      if(!Notification.permission) {
        Notification.permission = permission;
      }
      send();
    });
  }
  send();
}

module.exports = React.createClass({
  displayName: "App",
  getInitialState: function() {
    return {
      messages: []
    };
  },
  componentDidMount: function() {
    var that = this;
    $.get('/messages', function(result) {
      that.setState({
        messages: result
      });
    }).then(function() {
      var socket = io.connect(ioserver, { transports: ['websocket'] });
      socket.on('connect', function() {
        socket.on('message', function(message) {
          notify(message);

          var newMessages = that.state.messages.slice();
          newMessages.push(message);
          that.setState({messages: newMessages});
        });
      });
    });
  },
  render: function() {
    return (
      <div className="App">
        <Header />
        <Messages messages={this.state.messages} />
        <MessageForm onSubmit={postNewMessage}/>
      </div>
    );
  }
});

