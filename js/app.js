import React from "react";
import ReactDom from "react-dom";
import Relay from "react-relay";

import Main from "./components/Main"

ReactDom.render(<Main />, document.getElementById('react'));

console.log(
  Relay.QL`
    query Test {
      links {
        title
      }
    }`
);
