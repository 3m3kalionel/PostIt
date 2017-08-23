import React, { Component } from 'react';
import SearchResults from './SearchResults.jsx';

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: ['3m3ka', 'larry', 'vick']
    }
  }

  handleInputChange(event) {
    event.preventDefault();
    
    let name = event.target.value;

  }

  renderUserSearch() {
    return (
      <div className="user-list">
        <ul className="member-list">
          <li className="username">
            {/*{user}*/}
            <span><a href="#">Add</a></span>
          </li>
        </ul>
      </div>
    )
  }




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
                {this.state.searchResults.map(result => {
                    this.renderUserSearch()
                    })
                    }


                {/*<SearchResults />*/}

               
                
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

export default AddUserModal;