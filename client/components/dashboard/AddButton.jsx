import React, { Component } from 'react';
import AddGroup from './AddGroup.jsx';
import AddUser from './AddUser.jsx';



class AddButton extends Component {
  renderButton () {
    return (
      <div className="fixed-action-btn add-btn">
          <a href="#" className="btn-floating red"><i className="large material-icons">add</i></a>
          <ul>
            <li><a href="#user-to-group" className="btn-floating green modal-trigger"><i className="large material-icons">person_add</i></a></li>
            <li><a href="#new-group" className="btn-floating yellow modal-trigger"><i className="large material-icons">group_add</i></a></li>
          </ul>
      </div>
    );
  }

  renderUser () {
    return (
      <AddUser />
    )
  }

  renderGroup () {
    return (
      <AddGroup />
    )
  }

  render () {
    return (
      <div>
        {this.renderButton()}
        {this.renderUser()}
        {this.renderGroup()}
      </div>
    );
  }
}

export default AddButton;
