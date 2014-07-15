var React = require('react');

module.exports = React.createClass({
  displayName: "MessageForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var input = this.refs.input.getDOMNode();
    var messageText = input.value.trim();

    if(messageText.length > 0) {
      this.props.onSubmit(messageText);
      input.value = '';
    }
  },
  render: function() {
    return (
      <form className="MessageForm" onSubmit={this.handleSubmit}>
        <input className="MessageForm-input" ref="input" placeholder="what've you got to say?" type="text"></input>
        <button type="submit" className="MessageForm-btn">send</button>
      </form>
    );
  }
});

