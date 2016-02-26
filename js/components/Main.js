import React from "react";
import Relay from "react-relay";

import Link from "./Link";

class Main extends React.Component {
  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({limit: newLimit})
  }
  render() {
    let content = this.props.store.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />;
    });
    return (
      <div>
        <h3>Portland JavaScript Meetups</h3>
        <select onChange={this.setLimit}>
          <option value="5" selected>5</option>
          <option value="10">10</option>
        </select>

        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

// Declare the data requirment for this component
Main = Relay.createContainer(Main, {
  intitialVariables: {
    limit: 5
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        linkConnection(first: $limit) {
          edges {
            node {
              id,
              ${Link.getFragment('link')}
            }
          }
        }
      }
    `
  }
});

export default Main;
