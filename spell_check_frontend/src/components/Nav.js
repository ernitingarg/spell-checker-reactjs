import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <img
          align="left"
          src={require("../images/spellcheck.jpg")}
          alt=""
          height={182}
          width={182}
        />
        <img
          align="right"
          src={require("../images/ab.jpg")}
          alt=""
          height={182}
          width={182}
        />
      </div>
    );
  }
}

export default Nav;
