import React from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { links: LinkStore.getAll() };
}

class Main extends React.Component {
  // static propTypes = {
  //   limit: React.propTypes.number
  // }
  //
  // static defaultProps = {
  //   limit: 3
  // }

  state = _getAppState();


  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange)
  }
  componentWillUnmount() {
    LinkStore.on("change", this.onChange);
  }
  onChange = () => {
    this.setState(_getAppState());
  }
  render() {
    let content = this.state.links.map(link => {
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

export default Main;
