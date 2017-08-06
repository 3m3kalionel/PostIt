import React, { Component } from 'react';
import GroupList from './GroupList.jsx';


class GroupsDiv extends Component {
  render() {
    return (
      <div className="col m4" id="groups">
        <GroupList />
      </div>
    );
  }
}

export default GroupsDiv;