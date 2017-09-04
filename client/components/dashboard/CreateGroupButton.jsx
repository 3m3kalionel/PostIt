import React, { Component } from 'react';

class CreateGroupButton extends Component {
  render () {
    return (
      <div>
        <li><a
          href="#new-group"
          className="btn-floating rgb(243, 243, 243, 1) modal-trigger"
        ><i className="large material-icons">group_add</i></a></li>
      </div>
    );
  }
}

export default CreateGroupButton;
