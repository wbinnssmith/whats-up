var React = require('react');

module.exports = React.createClass({
  displayName: 'Header',
  render: function() {
    return (
      <header className="Header">
        <h1 className="Header-title">What'sUp?</h1>
        <div className="Header-note">Chat with your friends free, forever.</div>
      </header>
    );
  }
});

