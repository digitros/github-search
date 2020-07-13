import React from "react";
import { Link } from "react-router-dom";

import Main from "../components/Main";
import Aside from "../components/Aside";

import "../assets/styles/Home.styl";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: undefined,
  };

  getInitialState() {
    return { selectedTabId: 1 };
  }

  isActive(id) {
    return this.state.selectedTabId === id;
  }

  setActiveTab(selectedTabId) {
    this.setState({ selectedTabId });
  }

  render() {
    let item = this.props.location.state;

    return (
      <>
        {item === undefined && <Aside initialState={undefined} />}
        {item !== undefined && <Aside initialState={item} />}
        <div className="Home">
          <div className="Main">
            <Main />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
