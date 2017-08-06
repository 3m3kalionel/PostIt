import React, { Component } from 'react';

class AddUser extends Component {
  render() {
    return (
      <div id="user-to-group" className="modal">
        <div className="modal-content">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="icon_prefix" type="text" className="validate" />
                  <label htmlFor="icon_prefix">Username</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">group</i>
                  <input id="icon_telephone" type="tel" className="validate" />
                  <label htmlFor="icon_telephone">Group name</label>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Submit
                      <i className="mdi-content-send right" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}

export default AddUser;
