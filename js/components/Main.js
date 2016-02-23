import React from "react";
import Relay from "react-relay";

class Main extends React.Component {
  render() {
    let content = this.props.store.links.map(link => {
      return <li key={link._id}>
               <a href={link.url}>{link.title}</a>
             </li>;
    });
    return (
      <div>
        <h3>Portland JavaScript Meetups</h3>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

// Declare the data requirment for this component
Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        links {
          _id,
          title,
          url,
        }
      }
    `
  }
});

export default Main;
