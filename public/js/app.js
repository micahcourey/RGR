var React = require("react");
var ReactDom = require("react-dom");

var Hello = React.createClass({
  render: function() {
    return React.createElement("h3", null, "Hello React!");
  }
});

ReactDom.render(React.createElement(Hello), document.getElementById('react'));
