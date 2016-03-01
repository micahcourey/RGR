import React from "react";
import Relay from "react-relay";

import Link from "./Link";
import CreateLinkMutation from "../mutations/CreateLinkMutation";

class Main extends React.Component {
  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({limit: newLimit})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Relay.Store.update(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store
      })
    );
    this.refs.newTitle.value = "";
    this.refs.newUrl.value = "";
  }
  render() {
    let content = this.props.store.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />;
    });
    return (
      <div>
        <h3>Portland JavaScript Meetups!</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Title" ref="newTitle" />
          <input type="test" placeholder="Url" ref="newUrl" />
          <button type="submit">Add</button>
        </form>
        <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
          <option value="5">5</option>
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
        id,
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
