import React from 'react';

const AddUserButton = () => (
  <div>
    <li>
      <a
        href="#user-to-group"
        className="btn-floating modal-trigger tooltipped float-button"
        data-position="left"
        data-delay="50"
        data-tooltip="add user to group"
      >
        <i
          className="large material-icons"
        >person_add
        </i>
      </a>
    </li>
  </div>
);

export default AddUserButton;
