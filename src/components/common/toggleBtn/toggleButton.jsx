import PropTypes from "prop-types";
import React, { Component } from "react";

import "./toggleButton.css";

export class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selected, toggleSelected, name, toggleYesMsg, toggleNoMsg } = this.props;
    return (
      <div className="toggle-container" onClick={toggleSelected}>
        <div className={`dialog-button ${selected ? "" : "disabled"}`}>
          {selected ? (toggleYesMsg == null ? 'Yes' : toggleYesMsg) : (toggleNoMsg == null ? 'No' : toggleNoMsg)}
        </div>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired
};
