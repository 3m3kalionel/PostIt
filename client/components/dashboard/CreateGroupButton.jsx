import React from 'react';

const CreateGroupButton = () => (
  <div>
    <li><a
      href="#new-group"
      className="btn-floating modal-trigger tooltipped float-button"
      data-position="left"
      data-delay="50"
      data-tooltip="create group"
    ><i className="large material-icons">group_add</i></a></li>
  </div>
);

export default CreateGroupButton;
