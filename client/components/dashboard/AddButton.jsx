import React from 'react';

import AddUserButton from './AddUserButton';
import CreateGroupButton from './CreateGroupButton';

const AddButton = () => (
  <div className="fixed-action-btn add-btn">
    <a
      href="#!"
      className="btn-floating"
    ><i className="large material-icons">add</i></a>
    <ul>
      <AddUserButton />
      <CreateGroupButton />
    </ul>
  </div>
);

export default AddButton;

