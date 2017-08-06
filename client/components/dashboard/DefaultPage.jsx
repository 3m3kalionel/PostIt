import React, { Component } from 'react';

class DefaultPage extends Component {
  render() {

        return (
          <div>
            <nav>
              <div className="container">
                {/*<div class="nav-wrapper row">*/}
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                <a href="#!" className="brand-logo col s3 m9">PostIt!</a>
                <ul className="right col s5 offset-s4 m3">
                  <li><a className="large material-icons">notifications</a></li>                        
                  <li><a href="#!" className="material-icons large">exit_to_app</a></li>
                </ul>
                {/*</div>*/}
              </div>
            </nav>
            {/*SLIDE-OUT NAV
            <ul id="slide-out" class="side-nav" style="transform: translateX(0px);">
            <li><a href="#!">First Sidebar Link</a></li>
            <li><a href="">Item List</a></li>
            </ul>*/}
            {/*2 section page*/}
            <div className="row" id="two-section-page">
              {/*groups*/}
              <div className="col m4" id="groups">
                <ul id="slide-out" className="side-nav groups-nav fixed" style={{transform: 'translateX(0%)'}}>
                  <li className="bold no-padding"><a className="waves-effect waves-teal">Groups</a></li>
                  <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
                  <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
                  <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
                  <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
                  <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
                </ul>
              </div>{/*end groups*/}

              <div className="col m8" id="chat-input">

                {/* Modal Structure */}
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
                </div>  {/* close modal */}

                {/* Modal Structure */}
                <div id="new-group" className="modal">
                  <div className="modal-content">
                    <div className="row">
                      <form className="col s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" className="validate" />
                            <label htmlFor="icon_prefix">Group name</label>
                          </div>
                          <div className="input-field col s12">
                            <i className="material-icons prefix">edit</i>
                            <input id="icon_telephone" type="tel" className="validate" />
                            <label htmlFor="icon_telephone">Description</label>
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
                </div>  {/* close modal */}

                <ul id="message-list">
                  <li>
                    <div className="row">
                      <div className="col s12">
                        <div className="card blue-grey darken-1">
                          <div className="card-content white-text">
                            <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col s12">
                        <div className="card blue-grey darken-1">
                          <div className="card-content white-text">
                            <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col s12">
                        <div className="card blue-grey darken-1">
                          <div className="card-content white-text">
                            <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <div id="message-input" className="col l12">
                  <textarea defaultValue={""} />
                </div>

              </div>
              
              {/*ADD BUTTON + POPUPS*/}
              <div className="fixed-action-btn add-btn">
                <a href="#" className="btn-floating red"><i className="large material-icons">add</i></a>
                <ul>
                  <li><a href="#" className="btn-floating orange"><i className="large material-icons">mode_edit</i></a></li>
                  <li><a href="#user-to-group" className="btn-floating green modal-trigger"><i className="large material-icons">person_add</i></a></li>
                  <li><a href="#new-group" className="btn-floating yellow modal-trigger"><i className="large material-icons">group_add</i></a></li>
                </ul>
              </div>
              
            </div>
          </div>
        );


  }
}

export default DefaultPage;