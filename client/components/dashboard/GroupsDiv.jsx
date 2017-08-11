import React, { Component } from 'react';
import ShowGroups from './ShowGroups.jsx';

class GroupsDiv extends Component {
  render() {
    return (
      <div className="col m4" id="groups">
        <ShowGroups />
      </div>
    );
  }
}

export default GroupsDiv;