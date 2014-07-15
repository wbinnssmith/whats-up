var React = require('react');
var moment = require('moment');

function localFriendlyTime(utcString) {
  return moment.utc(utcString).local().calendar();
}

var Message = React.createClass({
  displayName: "Message",
  render: function() {
    return (
      <li className="Message">
        <div className="Message-user"><strong>User #{this.props.userId}</strong></div>
        <div className="Message-text">{this.props.text}</div>
        <div className="Message-date">{localFriendlyTime(this.props.createdAt)}</div>
      </li>
    );
  }
});

module.exports = React.createClass({
  displayName: "Messages",
  componentDidUpdate: function() {
    // Scroll to the bottom whenever we update
    var list = this.getDOMNode();
    list.scrollTop = list.scrollHeight;
  },
  getMessages: function() {
    return this.props.messages.map(function(message) {
      return <Message key={message.id} text={message.text} createdAt={message.created_at.date} userId={message.user_id} />;
    });
  },
  render: function() {
    return (
      <ol className="Messages">
        {this.getMessages()}
      </ol>
    );
  }
});

